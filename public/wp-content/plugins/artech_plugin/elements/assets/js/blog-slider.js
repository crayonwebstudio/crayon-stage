!(function ($) {
    "use strict";
    function artech_blog_slider() {
        $('.artech-blog-slider').each(function (index,slider) {
            let $carousel = $(this);
            let speed = $carousel.data('swiper-speed');
            let slidesPerView = $carousel.data('slides-per-view') || 2;
            let spaceBetween = $carousel.data('space-between');
            let center = $carousel.data('center');
            let breakPoints = $carousel.data('custom-breakpoints');
            var swiperOptions = {
                spaceBetween: spaceBetween || 30, // Default to 30 if not provided
                speed: speed || 1500,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: false,
                mousewheel: false,
                keyboard: true,
                autoplay: {
                    delay: 5000,
                },
                loop: true,
            };
            if (slidesPerView!=null){
                swiperOptions.slidesPerView = slidesPerView;
            }
            if (center){
                swiperOptions.centeredSlides = true
            }
            if (breakPoints != null) {
                swiperOptions.breakpoints = JSON.parse(breakPoints);
            } else {
                swiperOptions.breakpoints = {
                    0: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 1,
                    },
                    787: {
                        slidesPerView: slidesPerView,
                    },
                    991: {
                        slidesPerView: slidesPerView,
                    },
                    1200: {
                        slidesPerView: slidesPerView,
                    }
                };
            }
            var swiper = new Swiper(slider, swiperOptions);
        });
    }
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/artech-blog-slider.default', artech_blog_slider);
    });
})(jQuery);