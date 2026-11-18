(function () {
  "use strict";
  var cfg = window.FORGELAB_CONFIG || {};
  var pay = cfg.payment || {};
  var $ = function (id) { return document.getElementById(id); };

  var y = $("year"); if (y) y.textContent = new Date().getFullYear();
  if (cfg.email) Array.prototype.forEach.call(document.querySelectorAll("[data-contact-email]"), function (a) {
    a.href = "mailto:" + cfg.email; a.textContent = cfg.email;
  });

  // Only payment pages hosted by the configured provider are accepted,
  // so this page can never be used to send visitors to another website.
  var allowedHost = function (url) {
    try {
      var u = new URL(url);
      if (u.protocol !== "https:") return false;
      return (pay.allowedHosts || []).some(function (h) {
        return u.hostname === h || u.hostname.slice(-(h.length + 1)) === "." + h;
      });
    } catch (e) { return false; }
  };

  var q = new URLSearchParams(location.search);
  var ref = (q.get("devis") || "").slice(0, 40);
  var amount = parseFloat((q.get("montant") || "").replace(",", "."));
  var name = (q.get("nom") || "").slice(0, 60);
  var link = q.get("lien") || "";

  var ok = ref && amount > 0 && amount < 100000 && allowedHost(link);
  if (!ok) { $("pay-missing").hidden = false; return; }

  $("pay-ref").textContent = ref;
  $("pay-amount").textContent = "CHF " + amount.toFixed(2);
  if (name) { $("pay-name").textContent = name; $("pay-name-row").hidden = false; }
  if (pay.providerName) $("pay-provider").textContent = pay.providerName;
  $("pay-go").href = link;
  $("pay-go").textContent = "Payer CHF " + amount.toFixed(2);
  $("pay-ok").hidden = false;
})();
