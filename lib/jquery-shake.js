import jQuery from "jquery";  
import $ from "jquery";  

jQuery.fn.shake = function (
  intShakes = 20,
  intDistance = 2,
  intDuration = 0.5,
  animFinished = function(){ }
) {
  this.each(function (_) {
    $(this).css("position", "relative");
    for (var x = 1; x <= intShakes; x++) {
      $(this)
        .animate({ left: intDistance * -1 }, intDuration / intShakes / 4)
        .animate({ left: intDistance }, intDuration / intShakes / 2)
        .animate({ left: 0 }, intDuration / intShakes / 4)
    }
  }).promise().done(function () {
    animFinished();
  });
  return this;
};
