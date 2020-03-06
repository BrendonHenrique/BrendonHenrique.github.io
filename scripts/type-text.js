var $cursor = $("#cursor"),
  cursorInterval = 0.1,
  mySplitText = new SplitText("#text", {
    type: "words,chars",
    charsClass: "chars",
    position: "absolute"
  }),
  $chars = $(".chars"),
  tl = new TimelineMax({
    paused: true,
    delay: 1,
    // comment out yoyo, repeat, repeatDelay, and onRepeat below if no reverse is needed
    yoyo: true,
    repeat: -1,
    repeatDelay: 2,
    onRepeat: function () {
      //stops blinking
      TweenLite.set($cursor, {
        autoAlpha: 1
      });
    }
  });

TweenLite.set("#textWrapper", {
  visibility: "visible"
});

//enable the blinking cursor
function blinkingCursor() {
  TweenMax.fromTo($cursor, 0.5, {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    repeat: -1,
    ease: SteppedEase.config(1)
  })
}

// this makes the cursor resume blinking after reversing
tl.call(blinkingCursor);

// this makes it visible (not blinking) when playing forward
tl.set($cursor, {
  autoAlpha: 1
}, 0.1);

//loop through all the chars and make them visible AND set cursor to their right at same time
$chars.each(function (i, el) {

  var $char = $(el),
    offset = $char.offset(),
    width = $char.width(),
    leftExtra = 400,
    topExtra = 400;

  // set initial $cursor CSS properties
  // you may have to play with leftExtra and topExtra for alignment
  tl.set($cursor, {
    left: (offset.left + width) - leftExtra,
    top: (offset.top - topExtra)
  }, (i + 1) * cursorInterval);

  // set initial $char CSS properties
  tl.set($char, {
    autoAlpha: 1
  }, ((i + 1) * cursorInterval));
});

// re-call blinkingCursor function after the last char is displayed
tl.call(blinkingCursor);

// control speed of typing
tl.timeScale(0.6);

// start blinkingCursor before playing timeline
blinkingCursor();

// play timleine after 1 second delay
TweenMax.delayedCall(1, function () {
  tl.progress(1).progress(0);
  tl.play();
});