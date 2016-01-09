(function() {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

// handles swipeup and swipedown
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };

//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();

$(document).ready(function() {
  $(window).on('swiperight', function(e) {
    sendEvent('keyDown', 'right');
    e.stopPropagation();
  });
  $(window).on('swipeleft', function(e) {
    sendEvent('keyDown', 'left');
    e.stopPropagation();
  });
  $(window).on('swipeup', function(e) {
    sendEvent('keyDown', 'up');
    e.stopPropagation();
  });
  $(window).on('swipedown', function(e) {
    sendEvent('keyDown', 'down');
    e.stopPropagation();
  });
  $(window).on('click', function(e) {
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
