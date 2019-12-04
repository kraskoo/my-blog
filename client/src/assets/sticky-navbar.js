(function () {
  var navbar = function () {
    return window.document.getElementById('main-navbar');
  }

  function elementOffsetsToCompare() {
    window.addEventListener('scroll', function () {
      var sticky = navbar().offsetTop;
      if (window.pageYOffset >= sticky + 35) {
        navbar().classList.add('sticky-navbar');
      } else {
        navbar().classList.remove('sticky-navbar');
      }
    });
  }

  window.addEventListener('load', function() {
    elementOffsetsToCompare(document.querySelector('nav'), document.querySelector('main'));
  });
}());