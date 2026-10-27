!(function ($) {
    "use strict";
    function artech_capabilities_slider() {
        var swiper = new Swiper('.artech-capabilities-slider', {
            slidesPerView: 5,
            spaceBetween: 30,
            // centeredSlides: true,
            speed: 1500,
            pagination: false,
            navigation: false,
            mousewheel: false,
            keyboard: true,
            autoplay: {
                delay: 6000,
            },
            loop: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                787: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 2.8,
                }
            }
        });
    }
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/artech-capabilities-slider.default', artech_capabilities_slider);
    });
})(jQuery);