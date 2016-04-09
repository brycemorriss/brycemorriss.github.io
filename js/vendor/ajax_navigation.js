var isAnimating = false;
var imgLoaded = false;
var imgBgLoaded = false;
var endCurrPage = false;
var endNextPage = false;
var animation_id = 0;
var state_uid = 1;

var outClasses = [
    'scaleDown',
];
var inClasses = [
    'moveFromLeft',
    'moveFromRight',
    'moveFromBottom',
];

$('body').on('click', 'a', function (e) {
    var $url = $(this).attr('href');
    if (!$(this).hasClass('no-ajax-load') && !$(this).hasClass('fancybox-nav') && $(this).attr('target') !== "_blank" && !$(this).hasClass('action-share-tw') && !$url.match(/^#/)) {
        e.preventDefault();
        var direction = "next";
        if ($(this).parents('#menu-primary-navigation').length) {
            direction = ($(this).parent().index() < $(this).parents('#menu-primary-navigation').find('.active').index()) ? 'prev' : 'next';
        } else if ($(this).data('direction')) {
            direction = $(this).data('direction');
        }
        changePage($url, false, direction);
    }
});

window.addEventListener("popstate", function (e) {
    var direction = "next";
    if (e.state) {
        direction = (e.state.state_uid < state_uid) ? 'prev' : 'next';
        state_uid = e.state.state_uid;
    }
    changePage(location.href, true, direction);
});

changePage = function ($url, fromPopstate, direction) {
    if (!isAnimating) {
        ajaxLoadContent($url, fromPopstate, direction);
    }
};

ajaxLoadContent = function ($url, fromPopstate, direction) {
//    $('body').addClass('page-is-changing');
    if (isAnimating) {
        return false;
    }
    isAnimating = true;
    if (typeof (fromPopstate) === "undefined") {
        fromPopstate = false;
    }

    var wrapper_selector = '.page-container';
    var wrapper = $(wrapper_selector);

    $.get($url, function (responseText, textStatus, xhr) {
        if (textStatus === "success") {
            var animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            };
            var animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ];
            var support = Modernizr.cssanimations;
            var $currPage = $('.pt-page-current');
            var $nextPage = $(responseText).find(wrapper_selector);
            $('#ajax-loader-container').append($nextPage);
            $('div.pt-page').each(function () {
                var $page = $(this);
                $page.data('originalClassList', $page.attr('class'));
            });
            var outClass = '', inClass = '';
            var animation = Math.floor((Math.random() * 67) + 1);
            animation = (direction === "prev") ? 68 : 67;
            switch (animation) {
                case 67:
                    outClass = 'pt-page-rotateSlideOut';
                    inClass = 'pt-page-rotateSlideIn';
                    break;
                case 68:
                    outClass = 'pt-page-rotateSlideLeftOut';
                    inClass = 'pt-page-rotateSlideLeftIn';
                    break;
            }
            $currPage.addClass(outClass).on(animEndEventName, function () {
                $currPage.off(animEndEventName);
                endCurrPage = true;
                if (endNextPage) {
                    onEndAnimation($currPage, $nextPage);
                }
            });

            $nextPage.addClass('pt-page-current ' + inClass).on(animEndEventName, function () {
                $nextPage.off(animEndEventName);
                endNextPage = true;
                if (endCurrPage) {
                    onEndAnimation($currPage, $nextPage);
                }
                onSuccessLoad(responseText, fromPopstate, $url, direction);
            });

            if (!support) {
                onSuccessLoad(responseText, fromPopstate, $url, direction);
                onEndAnimation($currPage, $nextPage);
            }
        } else {
            var error_msg = "EREOR " + xhr.status + " : " + xhr.statusText;
            alert(error_msg);
        }
    });

};

onEndAnimation = function ($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    resetPage($outpage, $inpage);
    isAnimating = false;
//    $("html, body").animate({scrollTop: 0}, 10);
    console.log('animate');
};

resetPage = function ($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList')).removeClass('pt-page-current').remove();
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
};

onSuccessLoad = function (responseText, fromPopstate, $url, direction) {
    $version = '4.5.3';
//    console.log('onSuccessLoad $version', $version);
//    console.log('!!!!!!!!!!!!!!!!!!!! onSuccessLoad !!!!!!!!!!!!!!!!!!!!!!');
    // Javascripts that must be reloaded after AJAX Call
    $.getScript($ASSET_PATH + '/js/vendor/ajax_navigation_scripts.js?ver=' + $version);
    $.getScript('/wp-content/plugins/js_composer/assets/lib/waypoints/waypoints.min.js?ver=' + $version);
    $.getScript('/wp-content/plugins/js_composer/assets/js/js_composer_front.js?ver=' + $version);
    // Title & History Push
    var document_title = $(responseText).filter('title').text();
    $('title').text(document_title);
    if (!fromPopstate) {
        var state_obj = {
            title: document_title,
            state_uid: state_uid,
            direction: direction
        };
        history.pushState(state_obj, document_title, $url);
        state_uid++;
    }
    // Set BODY classes
    var parser = new DOMParser();
    var doc = parser.parseFromString(responseText, "text/html");
    $('body').attr('class', $('body', doc).attr('class'));
    // Garbage collection, you don't need this anymore.
    parser = doc = null;
    // Update WP-AdminBar
    $('#wpadminbar').html($(responseText).filter('#wpadminbar').html());
    // Toggle navbar
    $('.collapse', $(responseText)).collapse();
    $('.collapse', $(responseText)).hide();
    // Functions to call on LOAD
    set_caption_bottom_offset();
    // Remove overflow hidden when page is loaded
    $('body').css('overflow-y', 'auto');
    js_composer_height_equalizer();
};

transitionsSupported = function () {
    return $('html').hasClass('csstransitions');
};