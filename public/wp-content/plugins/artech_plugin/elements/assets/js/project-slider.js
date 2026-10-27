(function ($) {
    "use strict";

    function initializeSwipers() {
        const sliders = $('.artech-project-slider .project-slider');
        sliders.each(function(index, slider) {
            var swiper = new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 1500,
                effect: 'fade',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                mousewheel: false,
                keyboard: true,
                autoplay: {
                    delay: 5000,
                },
                loop: false,
            });
        });
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/artech-project-slider.default', function($scope) {
            initializeSwipers();
        });
    });

})(jQuery);
