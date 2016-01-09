(function() {
  $(document).on('pageinit', function(event){
    $(window).on('swiperight', function(e) {
      sendEvent('keyDown', 'right');
      sendEvent('keyUp', 'right');
      e.stopPropagation();
    });
    $(window).on('swipeleft', function(e) {
      sendEvent('keyDown', 'left');
      sendEvent('keyUp', 'left');
      e.stopPropagation();
    });
    $(window).on('swipeup', function(e) {
      sendEvent('keyDown', 'up');
      sendEvent('keyUp', 'up');
      e.stopPropagation();
    });
    $(window).on('swipedown', function(e) {
      sendEvent('keyDown', 'down');
      sendEvent('keyUp', 'down');
      e.stopPropagation();
    });
    $(window).on('click', function(e) {
      sendEvent('keyDown', 'enter');
      sendEvent('keyUp', 'enter');
      e.stopPropagation();
    });
  });

  function sendEvent(type, key) {
    $.ajax('http://192.168.0.212:8000/api/inputs', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        type: type,
        keyCode: key
      })
    });
  }

  function showKeyboard() {
    $('.hidden-input').focus();
  }
})();
