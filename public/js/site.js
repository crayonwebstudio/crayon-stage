// Minimal vanilla interactions for Crayon Stage. No frameworks, no tracking.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var list = document.querySelector(".nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  document.querySelectorAll(".nav-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991 || isTouch) {
        if (!link.parentElement.classList.contains("open")) {
          e.preventDefault();
          link.parentElement.classList.add("open");
        }
      }
    });
  });
  document.querySelectorAll(".accordion-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.closest(".accordion-item");
      if (panel) panel = panel.querySelector(".accordion-collapse");
      if (!panel) return;
      var show = panel.classList.toggle("show");
      btn.classList.toggle("collapsed", !show);
      btn.setAttribute("aria-expanded", show ? "true" : "false");
    });
  });
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-status");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-status";
        note.setAttribute("role", "status");
        form.appendChild(note);
      }
      note.textContent = "Thanks. This form is front end only on this staging site, so nothing was sent. Please email info@crayonwebstudio.com instead.";
    });
  });

  /* Sliders: prev/next buttons and pagination dots, no Swiper library. */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".swiper").forEach(function (swiper) {
    var slides = swiper.querySelectorAll(".swiper-slide");
    if (!slides.length) return;
    var container = swiper.closest(".project-slider, .capabilities-slider, .testi-slider, .posts-slider, .services-slider") || swiper.parentElement;
    if (!container) container = swiper.parentElement;
    function goTo(index) {
      var slide = slides[index];
      if (!slide) return;
      swiper.scrollTo({ left: slide.offsetLeft - swiper.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    }
    function currentIndex() {
      var best = 0, bestDist = Infinity;
      slides.forEach(function (slide, i) {
        var d = Math.abs(slide.offsetLeft - swiper.offsetLeft - swiper.scrollLeft);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }
    var prev = container.querySelector(".swiper-button-prev");
    var next = container.querySelector(".swiper-button-next");
    if (prev) prev.addEventListener("click", function () { goTo((currentIndex() - 1 + slides.length) % slides.length); });
    if (next) next.addEventListener("click", function () { goTo((currentIndex() + 1) % slides.length); });
    var paginations = container.querySelectorAll(".swiper-pagination");
    paginations.forEach(function (pag) {
      pag.innerHTML = "";
      slides.forEach(function (slide, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "swiper-pagination-bullet";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () { goTo(i); });
        pag.appendChild(dot);
      });
    });
    function updateDots() {
      var idx = currentIndex();
      paginations.forEach(function (pag) {
        pag.querySelectorAll(".swiper-pagination-bullet").forEach(function (dot, i) {
          dot.classList.toggle("swiper-pagination-bullet-active", i === idx);
        });
      });
    }
    var ticking = false;
    swiper.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateDots(); ticking = false; });
    }, { passive: true });
    updateDots();
    /* Autoplay with loop, paused on hover or focus, off for reduced motion. */
    var autoplayTimer = null;
    function startAutoplay() {
      if (reduced || slides.length < 2) return;
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        if (swiper.closest(".tab-pane") && !swiper.closest(".tab-pane").classList.contains("active")) return;
        goTo((currentIndex() + 1) % slides.length);
      }, 5000);
    }
    function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }
    swiper.addEventListener("mouseenter", stopAutoplay);
    swiper.addEventListener("mouseleave", startAutoplay);
    swiper.addEventListener("focusin", stopAutoplay);
    swiper.addEventListener("focusout", startAutoplay);
    startAutoplay();
  });
  /* Portfolio tabs: Bootstrap tab JS is not on stage, so switch panes here. */
  document.querySelectorAll(".nav-pills .nav-link[role='tab']").forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      var section = tab;
      while (section && !section.querySelector(".tab-pane")) section = section.parentElement;
      if (!section) section = document;
      var paneId = tab.getAttribute("aria-controls");
      if (!paneId) return;
      section.querySelectorAll(".nav-pills .nav-link[role='tab']").forEach(function (other) {
        var isActive = other === tab;
        other.classList.toggle("active", isActive);
        other.setAttribute("aria-selected", isActive ? "true" : "false");
        other.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      section.querySelectorAll(".tab-pane").forEach(function (pane) {
        var isActive = pane.id === paneId;
        pane.classList.toggle("active", isActive);
        pane.classList.toggle("show", isActive);
        if (isActive) {
          var sw = pane.querySelector(".swiper");
          if (sw) sw.scrollLeft = 0;
        }
      });
    });
  });
  /* Close the mobile menu after tapping a link. */
  if (list) {
    list.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (link.parentElement && link.parentElement.classList.contains("nav-dropdown")) return;
        if (window.innerWidth <= 991) {
          list.classList.remove("open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* Scroll animations: wow fadeIn equivalent, triggered once on entry. */
  var wowEls = document.querySelectorAll(".wow");
  if ("IntersectionObserver" in window) {
    var wowObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          wowObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    wowEls.forEach(function (el) { wowObserver.observe(el); });
    document.querySelectorAll(".left_to_right_apperance").forEach(function (el) {
      var appObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            appObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      appObserver.observe(el);
    });
    /* Skill bars: fill to the labelled value when in view. */
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var item = bar.closest(".progress-item");
          var val = null;
          if (item) {
            var label = item.querySelector("h6");
            var m = label ? label.textContent.match(/(\d+)%/) : null;
            if (m) val = m[1];
          }
          if (!val) {
            var prog = bar.closest(".progress");
            val = prog ? prog.getAttribute("aria-valuenow") : bar.getAttribute("aria-valuenow");
          }
          if (val) bar.style.width = val + "%";
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(".progress-bar").forEach(function (bar) { barObserver.observe(bar); });
  } else {
    wowEls.forEach(function (el) { el.classList.add("in-view"); });
    document.querySelectorAll(".progress-bar").forEach(function (bar) {
      var item = bar.closest(".progress-item");
      var val = null;
      if (item) {
        var label = item.querySelector("h6");
        var m = label ? label.textContent.match(/(\d+)%/) : null;
        if (m) val = m[1];
      }
      if (!val) {
        var prog = bar.closest(".progress");
        val = prog ? prog.getAttribute("aria-valuenow") : bar.getAttribute("aria-valuenow");
      }
      if (val) bar.style.width = val + "%";
    });
  }
  /* Back to top button, shown after scrolling. */
  var backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }
  /* Sidebar menu, as on live. */
  var sideBtn = document.querySelector(".side-menu-btn");
  var sideMenu = document.getElementById("side-menu");
  var sideOverlay = document.getElementById("side-overlay");
  var sideClose = sideMenu ? sideMenu.querySelector(".close-btn") : null;
  function openSide() {
    if (!sideMenu) return;
    sideMenu.classList.add("open");
    if (sideOverlay) sideOverlay.classList.add("open");
    if (sideBtn) sideBtn.setAttribute("aria-expanded", "true");
  }
  function closeSide() {
    if (!sideMenu) return;
    sideMenu.classList.remove("open");
    if (sideOverlay) sideOverlay.classList.remove("open");
    if (sideBtn) sideBtn.setAttribute("aria-expanded", "false");
  }
  if (sideBtn) sideBtn.addEventListener("click", openSide);
  if (sideClose) sideClose.addEventListener("click", closeSide);
  if (sideOverlay) sideOverlay.addEventListener("click", closeSide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSide();
  });

  /* Portfolio Load More: reveal the second set of cards. */
  document.querySelectorAll(".load-more").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var second = document.querySelector(".second-set");
      if (second) second.style.display = "block";
      btn.style.display = "none";
    });
  });
});
