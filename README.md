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

## Mettre en ligne avec GitHub Pages
1. Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
2. Le site est publié sur `https://<utilisateur>.github.io/forgelab-3d-website/`.
3. Domaine personnalisé (ex. forgelab3d.ch) : ajoutez-le dans Settings → Pages, puis un enregistrement CNAME chez votre registraire.

## Aperçu local
```
python3 -m http.server 8000
```
puis ouvrez http://localhost:8000
