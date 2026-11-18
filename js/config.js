/*
 * ForgeLab 3D · réglages du site
 * Modifiez ce fichier pour adapter le site sans toucher au reste du code.
 */
window.FORGELAB_CONFIG = {
  // Coordonnées affichées dans la section Contact
  email: "contact@forgelab3d.ch",
  phone: "+41 00 000 00 00",
  city: "Suisse · sur rendez-vous",

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
      "ABS / ASA":       { perGram: 0.24 },
      "TPU":             { perGram: 0.30 },
      "Nylon / Carbone": { perGram: 0.42 },
      "Résine":          { perGram: 0.45 }
    },
    // Remise par quantité : à partir de N pièces, -X %
    volumeDiscounts: [
      { from: 10, discount: 0.10 },
      { from: 50, discount: 0.20 },
      { from: 200, discount: 0.30 }
    ]
  }
};
