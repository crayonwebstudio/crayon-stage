!(function ($) {

    let device_width = window.innerWidth;

    $(window).load(function () {
        $('[data-settings]').each(function () {
            let settings = $(this).data('settings');
            if (settings['tc_container_background_parallax'] == 'yes') {
                $(this).parallaxie({
                    speed: 0.4,
                    size: "cover",
                });
                $(this).css({ 'background-image': '', '--background-transition': '0' })
            }
        });
    });

    function waitForElementToExist(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                subtree: true,
                childList: true,
            });
        });
    }

    $(document).ready(function () {

        $('[data-settings]').each(function () {
            let settings = $(this).data('settings');
            if (settings['tc_dark_mode_responsive_hide_in_dark'] == 'yes') {
                $(this).addClass('tc-hide-in-dark')
            } else if (settings['tc_dark_mode_responsive_hide_in_light'] == 'yes') {
                $(this).addClass('tc-hide-in-light')
            } else if ((settings['tcg_advanced_hover'] == 'yes' && device_width > 1024) ||
                (settings['tcg_advanced_hover_tablet'] == 'yes' && device_width < 1024 && device_width > 767) ||
                (settings['tcg_advanced_hover_mobile'] == 'yes' && device_width < 767)) {
                $(this).addClass('tc-container-advanced-hover hidden')
            }
        });

        $('.tc-container-advanced-hover').parent().on('mouseenter', function () {
            const $element = $(this).find('.tc-container-advanced-hover');
            $element.removeClass('hidden');
            $element.addClass('tcg-container-adv-hover-active');
        }).on('mouseleave', function () {
            const $element = $(this).find('.tc-container-advanced-hover');
            $element.removeClass('tcg-container-adv-hover-active');
            $element.one('animationend', function () {
                $element.addClass('hidden');
            });
        });

        waitForElementToExist('.sticky-wrapper').then((elm) => {
            $('.tc-hide-nav-onscroll').each(function () {
                $(this).parent().addClass('tc-hide-nav-onscroll-handler')
            });

            $('.tc-display-nav-onscroll').each(function () {
                $(this).parent().addClass('tc-display-nav-onscroll-handler')
            });
        });

        var wind = $(window);
        var width = $(window).width();
        if (width > 991) {
            wind.on('scroll', function () {
                if ($('.is-sticky')[0]) {
                    $('.admin-bar .tcg-offcanvas-wrapper').css('top', 0);
                } else {
                    $('.admin-bar .tcg-offcanvas-wrapper').css('top', '');
                }
            });
        }

    });
})(jQuery); 