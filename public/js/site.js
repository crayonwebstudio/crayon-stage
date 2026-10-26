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
});
