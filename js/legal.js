(function () {
  "use strict";
  var cfg = window.FORGELAB_CONFIG || {}, L = cfg.legal || {};
  var set = function (key, text) {
    if (!text) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-legal="' + key + '"]'), function (el) { el.textContent = text; });
  };
  set("owner", L.owner);
  Array.prototype.forEach.call(document.querySelectorAll('[data-legal="street"]'), function (el) {
    if (L.street) { el.textContent = L.street + (el.getAttribute("data-suffix") || ""); return; }
    var n = el.nextElementSibling;
    if (n && n.tagName === "BR") n.remove();
    el.remove();
  });
  set("form", L.form);
  set("ide", L.ide ? "Numéro IDE : " + L.ide : "");
  if (L.vatNumber) {
    set("vat", "Numéro TVA : " + L.vatNumber);
    set("vat-cgv", "Les prix s'entendent TVA comprise.");
  }
  if (cfg.email) Array.prototype.forEach.call(document.querySelectorAll("[data-contact-email]"), function (a) {
    a.href = "mailto:" + cfg.email; a.textContent = cfg.email;
  });
})();
