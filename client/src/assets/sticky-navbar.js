(function () {
  var navbar = function () {
    return window.document.getElementById('main-navbar');
  }

  function elementOffsetsToCompare() {
    window.addEventListener('scroll', function () {
      if (Math.abs(window.outerHeight - document.body.scrollHeight) >= 90) {
        navbar().classList[window.pageYOffset >= navbar().offsetTop + 35 ? 'add' : 'remove']('sticky-navbar');
      }
    });
  }

  window.addEventListener('load', elementOffsetsToCompare);
}());