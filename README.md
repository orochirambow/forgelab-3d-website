# ForgeLab 3D · site vitrine

Site statique (HTML, CSS, JavaScript sans dépendance) pour ForgeLab 3D, atelier d'impression 3D.

## Contenu
- Accueil avec visuel héros (viking forgeron)
- Services, atelier et capacité machine, processus en 4 étapes
- Matériaux (PLA, PETG, TPU, Nylon/Carbone) en filament
- Estimateur de prix indicatif
- Formulaire de devis avec dépôt de fichiers 3D (STL, 3MF, STEP, OBJ…)
- FAQ, contact, page confidentialité (nLPD)

## Personnaliser
Tout se règle dans `js/config.js` :
- `email`, `city` : coordonnées affichées
- `formEndpoint` : URL d'un service de formulaire (ex. Formspree). Vide = ouverture de la messagerie du visiteur.
- `pricing` : prix au gramme par matériau, frais fixes, minimum, remises.

Les textes (délais, volume d'impression, etc.) sont dans `index.html`. Pensez aussi à compléter `confidentialite.html` (nom et adresse).

## Paiement par carte et TWINT (Stripe)
1. Stripe → Catalogue de produits → créez un produit « Devis FL-… » avec le prix exact du devis (CHF).
2. Créez un lien de paiement (Payment Link) pour ce produit.
   Onglet « Après le paiement » → « Ne pas afficher de page de confirmation » → rediriger vers
   `https://orochirambow.github.io/forgelab-3d-website/paiement-merci.html`
3. Ouvrez `lien-paiement.html` sur votre site, collez le lien Stripe, le numéro de devis et le montant.
4. Envoyez au client le lien obtenu : il arrive sur `paiement.html` (votre site), voit le récapitulatif et paie par carte ou TWINT.

Les domaines acceptés sont dans `payment.allowedHosts` (`js/config.js`).

## Mettre en ligne avec GitHub Pages
1. Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
2. Le site est publié sur `https://<utilisateur>.github.io/forgelab-3d-website/`.
3. Domaine personnalisé (ex. forgelab3d.ch) : ajoutez-le dans Settings → Pages, puis un enregistrement CNAME chez votre registraire.

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrez http://localhost:8000
