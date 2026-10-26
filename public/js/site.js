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
  document.querySelectorAll(".nav-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 820) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
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
    if (prev) prev.addEventListener("click", function () { goTo(Math.max(0, currentIndex() - 1)); });
    if (next) next.addEventListener("click", function () { goTo(Math.min(slides.length - 1, currentIndex() + 1)); });
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
  });
  /* Portfolio tabs: Bootstrap tab JS is not on stage, so switch panes here. */
  document.querySelectorAll(".nav-pills .nav-link[role='tab']").forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      var section = tab.closest("section") || document;
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
        if (window.innerWidth <= 820) {
          list.classList.remove("open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
