(function ($) {
    "use strict";
    const scaleImg = document.querySelectorAll(".artech-image.scale");
    if (scaleImg){
        scaleImg.forEach((caseCardDet, index) => {
            const scaleSetting = caseCardDet.getAttribute('data-scale') || 1.5;
            const startSetting = caseCardDet.getAttribute('data-start') || '-650px top';
            const xSetting = caseCardDet.getAttribute('data-x') || 0;
            const ySetting = caseCardDet.getAttribute('data-y') || 0;
            const durationSetting = caseCardDet.getAttribute('data-duration') || 15;
            const delaySetting = caseCardDet.getAttribute('data-delay') || 1;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: caseCardDet,
                    start: `${startSetting}`,
                    scrub: true
                }
            });

            const imgElement = caseCardDet.querySelector(".artech-image.scale img");
            tl.to(imgElement, {
                x: xSetting,
                y: ySetting,
                scale: scaleSetting,
                duration: durationSetting,
                delay: delaySetting,
            });
        });
    }
})(jQuery);