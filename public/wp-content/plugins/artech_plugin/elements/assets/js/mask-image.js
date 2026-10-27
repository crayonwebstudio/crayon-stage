!(function ($) {
    "use strict";

    function artech_mask_image() {
        const ImageWidgets = document.querySelectorAll(".artech-image");
        ImageWidgets.forEach(function (ImageWidget) {
            if (ImageWidget.getAttribute('data-mask-image') !== null) {
                const maskImageUrl = ImageWidget.getAttribute('data-mask-image');
                ImageWidget.style.maskImage = `url(${maskImageUrl})`;
            }
        });
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/artech-image.default', artech_mask_image);
    });

})(jQuery);
