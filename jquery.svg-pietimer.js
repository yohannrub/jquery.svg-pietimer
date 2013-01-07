/*!
 * jQuery SVG-PieTimer v@1.0
 * https://github.com/yohannrub/jquery.svg-pietimer
 * Licensed under the MIT license
 */

;(function($) {

    var DEFAULT_SETTINGS = {
        duration: 5000,
        refreshInterval: 50,
        loop: false,
        callback: $.noop,
        centerRadius: 33,
        cssClass: 'pietimer'
    };

    var GLOBALS = {};
    GLOBALS.radius = 50;
    GLOBALS.viewBoxSize = 2 * GLOBALS.radius;
    GLOBALS.svgPathD = 'M 0 0 v -' + GLOBALS.radius + ' A ' + GLOBALS.radius + ' ' + GLOBALS.radius + ' 1 ';

    var namespace = 'pietimer';

    var methods = {
        init: function(options) {
            options = $.extend({}, DEFAULT_SETTINGS, options);

            var svgHtml = [
            '<svg class="' + options.cssClass + '" viewBox="0 0 ' + GLOBALS.viewBoxSize + ' ' + GLOBALS.viewBoxSize + '">',
                '<path transform="translate(' + GLOBALS.radius + ',' + GLOBALS.radius + ')"/>',
                '<circle cx="' + GLOBALS.radius + '" cy="' + GLOBALS.radius + '" r="' + options.centerRadius + '"/>',
            '</svg>'
            ].join('');

            $(svgHtml).appendTo(this);

            return this.each(function() {
                var $this = $(this);
                var data = $.extend({}, options);

                data.isPlaying = false;
                data.timerInterval = null;
                data.timeStart = null;
                data.timePause = null;
                data.$svgPath = $this.find('path');

                $this.data(namespace, data);
            });
        },

        draw: function(ratio) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(namespace);

                var angle = ratio * 2 * Math.PI,
                x = Math.sin(angle) * GLOBALS.radius,
                y = Math.cos(angle) * -GLOBALS.radius,
                mid = (ratio % 1 > 0.5) ? 1 : 0,
                anim = GLOBALS.svgPathD + mid + ' 1 ' + x + ' ' + y + ' z';
                data.$svgPath.attr('d', anim);
            });
        },

        play: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(namespace);

                if (!data.isPlaying) {
                    data.isPlaying = true;
                    clearInterval(data.timerInterval);
                    data.timeStart = (data.timeStart && data.timePause) ? $.now() - (data.timePause - data.timeStart) : $.now();
                    data.timerInterval = setInterval(function() {
                        var ratio = ($.now() - data.timeStart) / data.duration;
                        if (ratio >= 1) {
                            data.callback.call($this);
                            if (data.loop) {
                                data.timeStart = data.timeStart + data.duration * Math.floor(ratio);
                            } else {
                                $this[namespace]('draw', 0.99999);
                                $this[namespace]('pause');
                                data.timeStart = data.timePause = null;
                                return;
                            }
                        }
                        $this[namespace]('draw', ratio);
                    }, data.refreshInterval);
                }
            });
        },

        pause: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(namespace);

                if (data.isPlaying) {
                    data.isPlaying = false;
                    clearInterval(data.timerInterval);
                    data.timePause = $.now();
                }
            });
        },

        stop: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(namespace);

                $this[namespace]('pause');
                data.timeStart = data.timePause = null;
                $this[namespace]('draw', 0);
            });
        },

        reset: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(namespace);

                $this[namespace]('pause');
                data.timeStart = data.timePause = null;
                $this[namespace]('play');
            });
        }
    };

    $.fn[namespace] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
        }
    };

})(jQuery);
