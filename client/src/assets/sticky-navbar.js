(function () {
  var navbar = function () {
    return window.document.getElementById('main-navbar');
  }

  window.addEventListener('scroll', function () {
    if (Math.abs(window.outerHeight - document.body.scrollHeight) >= 90) {
      var sticky = navbar().offsetTop;
      if (window.pageYOffset >= sticky + 35) {
        navbar().classList.add('sticky-navbar');
      } else {
        navbar().classList.remove('sticky-navbar');
      }
    }
  });
}());