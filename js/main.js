(function () {
  "use strict";
  var cfg = window.FORGELAB_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Year
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  // Contact details from config
  if (cfg.email) $$("[data-contact-email]").forEach(function (a) { a.href = "mailto:" + cfg.email; a.textContent = cfg.email; });
  if (cfg.city) $$("[data-contact-city]").forEach(function (b) { b.textContent = cfg.city; });

  // Mobile nav
  var toggle = $(".nav-toggle"), nav = $("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".card, .mat, .steps li, .spec, .section-head").forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  // Estimator
  var p = cfg.pricing;
  var selMat = $("#est-mat"), w = $("#est-w"), wOut = $("#est-w-out"), q = $("#est-q"), ex = $("#est-express"), out = $("#est-price");
  if (p && selMat) {
    Object.keys(p.materials).forEach(function (m) { var o = document.createElement("option"); o.textContent = m; selMat.appendChild(o); });
    var chf = function (n) { return "CHF " + (Math.round(n * 2) / 2).toFixed(2).replace(".00", ".–"); };
    var calc = function () {
      var grams = +w.value, qty = Math.max(1, Math.min(500, parseInt(q.value, 10) || 1));
      wOut.textContent = grams + " g";
      var unit = grams * p.materials[selMat.value].perGram;
      var disc = 0; p.volumeDiscounts.forEach(function (d) { if (qty >= d.from) disc = d.discount; });
      var total = unit * qty * (1 - disc) + p.setupFee;
      if (ex.checked) total *= p.expressMultiplier;
      total = Math.max(p.minimum, total);
      var lo = total * 0.85, hi = total * 1.15;
      out.textContent = chf(lo) + " – " + chf(hi).replace("CHF ", "");
    };
    [selMat, w, q, ex].forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
    // Carry estimator choices into the quote form
    $("#est-to-quote").addEventListener("click", function () {
      var qm = $("#q-mat"), qq = $("#q-qty");
      $$("option", qm).forEach(function (o) { if (o.textContent === selMat.value) qm.value = o.value; });
      qq.value = q.value;
    });
  }

  // File drop zone
  var drop = $("#drop"), file = $("#file"), list = $("#file-list");
  var MAX = 25 * 1024 * 1024;
  var showFiles = function () {
    var files = Array.prototype.slice.call(file.files || []);
    var size = files.reduce(function (s, f) { return s + f.size; }, 0);
    list.textContent = files.map(function (f) { return f.name; }).join(", ");
    if (size > MAX) list.textContent += " · trop volumineux (25 Mo max), envoyez plutôt un lien SwissTransfer dans le message.";
  };
  if (drop && file) {
    ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function () { drop.classList.add("over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function () { drop.classList.remove("over"); }); });
    file.addEventListener("change", showFiles);
  }

  // Quote form
  var form = $("#quote"), status = $("#form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity()) {
        status.textContent = "Merci de remplir les champs obligatoires (*).";
        status.classList.add("err");
        var bad = form.querySelector(":invalid"); if (bad) bad.focus();
        return;
      }
      var data = new FormData(form);
      if (data.get("_gotcha")) return;

      if (cfg.formEndpoint) {
        var btn = form.querySelector("button[type=submit]");
        btn.disabled = true; status.textContent = "Envoi en cours…";
        fetch(cfg.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            form.reset(); list.textContent = "";
            status.textContent = "Merci ! Votre demande est bien arrivée à la forge. Réponse sous 24 h ouvrées.";
            status.classList.add("ok");
          })
          .catch(function () {
            status.textContent = "L'envoi a échoué. Écrivez-nous directement à " + cfg.email + ".";
            status.classList.add("err");
          })
          .then(function () { btn.disabled = false; });
        return;
      }

      // Fallback: open the visitor's e-mail app with the request pre-filled
      var lines = [
        "Nom : " + data.get("nom"),
        "E-mail : " + data.get("email"),
        "Téléphone : " + (data.get("telephone") || "-"),
        "Type de projet : " + data.get("type_projet"),
        "Matériau : " + data.get("materiau"),
        "Quantité : " + data.get("quantite"),
        "Couleur : " + (data.get("couleur") || "-"),
        "",
        data.get("message")
      ];
      var hasFiles = file && file.files && file.files.length;
      if (hasFiles) lines.push("", "(Pensez à joindre vos fichiers : " + list.textContent + ")");
      window.location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Demande de devis · " + data.get("type_projet")) + "&body=" + encodeURIComponent(lines.join("\n"));
      status.textContent = "Votre messagerie s'ouvre avec la demande pré-remplie." + (hasFiles ? " N'oubliez pas d'y joindre vos fichiers." : "");
      status.classList.add("ok");
    });
  }
})();
