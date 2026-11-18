/*
 * ForgeLab 3D · réglages du site
 * Modifiez ce fichier pour adapter le site sans toucher au reste du code.
 */
window.FORGELAB_CONFIG = {
  // Coordonnées affichées dans la section Contact
  email: "contact.forgelab3d@gmail.com",
  city: "1027 Lonay (VD) · sur rendez-vous",

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

  // Grille tarifaire de l'estimateur (CHF). Prix indicatifs à ajuster.
  pricing: {
    setupFee: 8,          // frais de préparation par commande
    minimum: 15,          // montant minimum par commande
    expressMultiplier: 1.4,
    materials: {
      "PLA":             { perGram: 0.18 },
      "PETG":            { perGram: 0.20 },
      "TPU":             { perGram: 0.30 },
      "Nylon / Carbone": { perGram: 0.42 }
    },
    // Remise par quantité : à partir de N pièces, -X %
    volumeDiscounts: [
      { from: 10, discount: 0.10 },
      { from: 50, discount: 0.20 },
      { from: 200, discount: 0.30 }
    ]
  }
};
