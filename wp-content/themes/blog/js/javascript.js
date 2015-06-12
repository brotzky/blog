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


  (function(){
    var $w = $(window);
  var $circ = $('.animated-circle');
  var $progCount = $('.progress-count');
  var $prog2 = $('.progress-indicator-2');

  var wh, h, sHeight;

  function setSizes(){
    wh = $w.height();
    h = $(document).height();
    sHeight = h - wh;
  }

 setTimeout(function() {  setSizes(); }, 300);

  $w.on('scroll', function(){
    var perc = Math.max(0, Math.min(1, $w.scrollTop()/sHeight));
    updateProgress(perc);
  }).on('resize', function(){
    setSizes();
    $w.trigger('scroll');
  });

  function updateProgress(perc){
    var circle_offset = 126 * perc;
    $circ.css({
      "stroke-dashoffset" : 126 - circle_offset
    });
    $progCount.html(Math.round(perc * 100) + "%");

    $prog2.css({width : perc*100 + '%'});
  }

}());
});


