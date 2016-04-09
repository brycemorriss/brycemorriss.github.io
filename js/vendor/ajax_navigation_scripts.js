(function ($) {
    //console.log('ajax_navigation_scripts.js LOADED');
    $(window).on('load resize', function () {
        set_caption_bottom_offset();
        univers_equalizer();
    });

    // Parallax
    if ($('.parallax-viewport').length) {
        $('.parallax-layer').each(function () {
            var $bg_image = $(this).data('background-image');
            $(this).css({
                'background-image': 'url(' + $bg_image + ')'
            });
        });
        $('.parallax-viewport').parallax({
            scalarX: 10,
            limitX: 200,
            scalarY: 2.5,
            limitY: 50
        });
    }
    // Trigger resize to correct come bugs
    $(window).trigger('resize');

    setTimeout(function () {
        $(window).trigger('resize');
    }, 200);

    randomizedGallery = function () {
        var nb_members = parseInt($('.member-item').length);
        var active_item = Math.floor(Math.random() * nb_members);
        var member_item = $('.member-item').eq(active_item);

        $("img.active", member_item)
                .removeClass('active')
                .nextThumb()
                .addClass('active')

        setTimeout(randomizedGallery, TEAM_MEMBER_GALLERY_TIMEOUT);
    };

    if ($('.member-item').length) {
        setTimeout(randomizedGallery, TEAM_MEMBER_GALLERY_TIMEOUT);
    }

    $('#carousel-header').on('slid.bs.carousel', function () {
        var $this = $(this);
        $('.item', $this).each(function () {
            var $method = (!$(this).hasClass('active')) ? 'disable' : 'enable';
            $('.parallax-viewport', $(this)).parallax($method);
        });
    });

    $('.vc_general.vc_btn3').each(function () {
        $(this).html('<span class="btn-content">' + $(this).html() + '</span>');
    });

    // Google Map show
    if ($('#gmap').length) {
        google.maps.event.addDomListener(window, 'load', init);
    }


    // IMG HEADER
    if ($('.header-img').length) {
        $(window).on('scroll', function () {
            animateHeader();
        });
    }
    // Phrases swapper
    if ($('.phrases-swapper').length) {
        setInterval(function () {
            $('.phrases-swapper').each(function () {
                var $this = $(this);
                var $current_phrase = $('.phrase-item.active', $(this));
                var $current_width = $current_phrase.width();
                var $current_height = $current_phrase.height();
                var $next_phrase = get_next_phrase($(this));
                var $next_width = $next_phrase.width();
                var $max_width = ($current_width > $next_width) ? $current_width : $next_width;
                $('.phrases-swapper-overlay', $(this)).width($max_width).height($current_height);
                setTimeout(function () {
                    $current_phrase.removeClass('active');
                    $next_phrase.addClass('active');
                    $('.phrases-swapper-overlay', $this).width(0);
                }, 700);
            });
        }, 3000);
    }

    function get_next_phrase($parent) {
        if ($('.phrase-item.active', $parent).next().length) {
            return $('.phrase-item.active', $parent).next();
        } else {
            return $('.phrase-item', $parent).eq(0);
        }
    }
})(jQuery);