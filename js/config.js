/*
 * ForgeLab 3D · réglages du site
 * Modifiez ce fichier pour adapter le site sans toucher au reste du code.
 */
window.FORGELAB_CONFIG = {
  // Coordonnées affichées dans la section Contact
  email: "contact.forgelab3d@gmail.com",
  city: "1027 Lonay (VD) · envoi par La Poste",

  // Mentions légales et CGV (pages mentions-legales.html, cgv.html, confidentialite.html)
  legal: {
    owner: "Evan Allan Özkan",
    street: "Chemin des Abbesses 2a",
    form: "entreprise individuelle",
    ide: "",          // numéro IDE (CHE-xxx.xxx.xxx) si inscrit au registre du commerce
    vatNumber: ""     // numéro TVA si assujetti, sinon laisser vide
  },

  // Adresse publique du site (sert à créer les liens de paiement)
  siteUrl: "https://orochirambow.github.io/forgelab-3d-website/",

  // Paiement en ligne (carte bancaire + TWINT) via des liens de paiement.
  // Seuls les liens hébergés sur ces domaines sont acceptés par la page paiement.html.
  // Prestataire actuel : Stripe (liens « buy.stripe.com »).
  // Pour passer à Payrexx plus tard : providerName "Payrexx" et ajoutez "payrexx.com".
  payment: {
    providerName: "Stripe",
    allowedHosts: ["buy.stripe.com"]
  },

  // Galerie « Réalisations »
  // 1. Copiez vos photos dans le dossier assets/realisations/ (JPG ou WebP, 1600 px de large max).
  // 2. Ajoutez une ligne par photo ci-dessous, les plus récentes en premier.
  // Exemple :
  //   { photo: "assets/realisations/support-velo.jpg", titre: "Support de vélo mural", matiere: "PETG", details: "Série de 20 pièces, noir mat" },
  // Tant que la liste est vide, le site affiche « Les premières photos arrivent bientôt ».
  realisations: [
  ],

  // Adresse du service qui reçoit le formulaire de devis.
  // Exemple Formspree : "https://formspree.io/f/xxxxxxxx"
  // Laissez vide pour que le formulaire ouvre la messagerie du client (mailto).
  formEndpoint: "",

  // Grille tarifaire de l'estimateur (CHF), calculée sur les prix Bambu Lab en Suisse (nov. 2026) :
  //   prix/g = coût filament/g × 1.15 (pertes, purges, ratés) + temps machine/g
  //   temps machine : ~20 g/h facturés 2.60 CHF/h (électricité, usure, amortissement X2D, main-d'œuvre)
  //   PLA Basic ~19 CHF/kg · PETG HF 25.50 CHF/kg · TPU for AMS 38 CHF/kg · PA6-CF 86 CHF/kg
  //   TPU et PA6-CF s'impriment plus lentement : temps machine compté plus haut.
  //   Coût de revient/g : PLA 0.15 · PETG 0.16 · TPU 0.28 · PA6-CF 0.30
  //   Prix de vente = coût × 2 (marge ~50 %, ~45 % sur le TPU), aligné sur la concurrence locale
  //   (ex. 3D et plus, Gland : 0.35 CHF/g + 2 CHF, nov. 2026).
  pricing: {
    setupFee: 5,          // frais de préparation par commande
    minimum: 10,          // montant minimum par commande
    expressMultiplier: 1.4, // non utilisé : pas de service express pour le moment
    materials: {
      "PLA":             { perGram: 0.30 },
      "PETG":            { perGram: 0.32 },
      "TPU":             { perGram: 0.50 },
      "Nylon / Carbone": { perGram: 0.60 }
    },
    // Remise par quantité : à partir de N pièces, -X %
    volumeDiscounts: [
      { from: 10, discount: 0.10 },
      { from: 50, discount: 0.20 },
      { from: 200, discount: 0.30 }
    ]
  }
};
