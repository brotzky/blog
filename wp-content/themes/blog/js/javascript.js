$( document ).ready(function() {


  var didScroll;
  $( window ).scroll(function(event) {
      didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 150);

  function hasScrolled() {

     var navTop = $(window).scrollTop();
       var fixedNav =  $('.fixed-nav');

       if (navTop > 0){
         fixedNav.addClass('nav-box-shadow');
       } else {
         fixedNav.removeClass('nav-box-shadow');
      }
  }

});