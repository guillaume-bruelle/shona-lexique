# Lexique Shona — application installable (PWA)

Lexique shona-français hors ligne : recherche libre, filtre par lettre et par thème,
filtre « Zezuru seul », ajout de mots et export CSV.
Première brique de Shona Lab (stratégie, partie 3 : PWA hors ligne, IndexedDB).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application (interface, recherche, ajouts) |
| `lexique.json` | Les 821 entrées de `claude/lexique-shona.csv` (copie du 17/10/2026) |
| `manifest.webmanifest` | Nom, icônes, couleurs, affichage plein écran (`standalone`) |
| `sw.js` | Service worker : met tout en cache pour l'usage hors ligne |
| `icons/` | Icônes (192, 512, masquable, iPhone, favicon) |

## Mise en ligne sur GitHub Pages (≈ 10 min, depuis un ordinateur)

1. Sur github.com : **New repository** → nom `shona-lexique` → **Public** → *Create repository*.
   (GitHub Pages gratuit exige un dépôt public : le lexique sera visible par qui a l'adresse.
   Vos ajouts, eux, restent sur le téléphone.)
2. Dans le dépôt : **Add file → Upload files**, puis glissez **tout le contenu** du dossier
   (les fichiers ET le dossier `icons`). Vérifiez que `index.html` est à la racine, pas dans un sous-dossier.
   → *Commit changes*.
3. **Settings → Pages** → *Source* : **Deploy from a branch** → branche `main`, dossier `/ (root)` → *Save*.
4. Attendez 1–2 min. L'adresse s'affiche en haut de la page Pages :
   `https://<votre-identifiant>.github.io/shona-lexique/`

## Installation sur le téléphone

- **Android (Chrome)** : ouvrez l'adresse → bouton **Installer** dans l'appli, ou menu ⋮ → *Installer l'application*.
- **iPhone (Safari)** : ouvrez l'adresse → bouton Partager → **Sur l'écran d'accueil**.

L'appli s'ouvre ensuite sans barre d'adresse. Ouvrez-la **une fois avec une connexion** :
elle fonctionne ensuite hors ligne (terrain, coupures).

Plein écran total (barre d'état masquée) : dans `manifest.webmanifest`, remplacez
`"display": "standalone"` par `"display": "fullscreen"` (Android seulement ; l'iPhone reste en `standalone`).

## Vos ajouts

- Enregistrés **sur le téléphone** (IndexedDB). Ils survivent aux mises à jour de l'appli,
  mais pas à une désinstallation ni à l'effacement des données du navigateur.
- **Exportez régulièrement** : *Copier mes ajouts (CSV)* ou *Télécharger le CSV* (mêmes colonnes que
  `claude/lexique-shona.csv`). Collez le CSV dans une conversation du projet pour les intégrer au lexique.

## Mettre à jour l'appli

1. Remplacez le(s) fichier(s) dans le dépôt (ex. un nouveau `lexique.json`).
2. Dans `sw.js`, **incrémentez** `VERSION` (ex. `lexique-v1.0.0` → `lexique-v1.1.0`). Sans cela,
   les téléphones garderont l'ancienne version en cache.
3. Au lancement suivant, l'appli affiche « Nouvelle version disponible » → *Recharger*.

## Rappels

- Les tons ne sont pas écrits : vérifiez toujours la prononciation à l'audio natif.
- Toutes les entrées sont « à vérifier » (fiabilité : tuteur › Hannan / Fortune › FSI › Ruzhowa › Wiktionary).
