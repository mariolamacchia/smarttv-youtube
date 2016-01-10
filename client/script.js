(function(smarttv) {
  'use strict';

  $(document).on('pageinit', function(event){
    $(window).on('swiperight', function(e) {
      smarttv.pressKey('right');
      e.stopPropagation();
    });
    $(window).on('swipeleft', function(e) {
      smarttv.pressKey('left');
      e.stopPropagation();
    });
    $(window).on('swipeup', function(e) {
      smarttv.pressKey('down');
      e.stopPropagation();
    });
    $(window).on('swipedown', function(e) {
      smarttv.pressKey('down');
      e.stopPropagation();
    });
    $(window).on('click', function(e) {
      smarttv.pressKey('enter');
      e.stopPropagation();
    });
  });

})(smarttv);
