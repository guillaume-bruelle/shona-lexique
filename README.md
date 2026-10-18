# Lexique Shona

Lexique shona-français installable sur téléphone et utilisable **hors ligne** :
recherche libre, filtre par lettre et par thème, ajout de mots et export CSV.

C'est la première brique de **Shona Lab**, une application d'apprentissage du shona
(variété cible : zezuru de Harare) fondée sur la recherche en acquisition des langues :
répétition espacée, rappel actif, input compréhensible, grammaire explicite.

**Appli en ligne :** `https://guillaume-bruelle.github.io/shona-lexique/`

---

## Fonctions

- **Recherche libre** en shona ou en français, sans tenir compte des accents ni du tiret
  des radicaux verbaux (`-tenga` se trouve en tapant `tenga`). Résultats classés par pertinence.
- **Filtre par lettre** : barre défilante, seulement les lettres présentes.
- **Filtre par thème** : agriculture, salutation, corps, maison… avec le nombre de mots.
- **« Zezuru seul »** : masque les formes karanga et manyika et l'argot daté.
- **Fiche de mot** : classe nominale, pluriel, registre, variété, source, note.
  Le signe ⚠ signale une note à contrôler.
- **Ajout de mots** depuis le terrain, modifiables et supprimables, enregistrés sur le téléphone.
- **Export CSV** des ajouts (copie ou téléchargement), aux mêmes colonnes que le lexique du projet.
- **Hors ligne** après la première ouverture ; thème clair ou sombre selon le téléphone.

## Contenu du dépôt

```
shona-lexique/
├── index.html             Application (interface, recherche, ajouts, installation)
├── lexique.json           Lexique de base : 821 entrées
├── manifest.webmanifest   Nom, icônes, couleurs, affichage sans barre d'adresse
├── sw.js                  Service worker : cache pour l'usage hors ligne
├── icons/                 Icônes 192, 512, masquable, iPhone, favicon
└── README.md
```

Aucune dépendance, aucune étape de compilation : ce sont des fichiers statiques.
Seules les polices viennent de Google Fonts ; sans réseau, l'appli utilise les polices du téléphone.

## Mise en ligne sur GitHub Pages

### Par le site github.com (sans ligne de commande)

1. **New repository** → nom `shona-lexique` → **Public** → *Create repository*.
2. **Add file → Upload files** : glissez tout le contenu du dossier, `icons/` compris.
   `index.html` doit être à la racine du dépôt. → *Commit changes*.
3. **Settings → Pages** → *Source* : **Deploy from a branch** → `main` / `/ (root)` → *Save*.
4. Après 1 à 2 minutes, l'adresse s'affiche en haut de la page *Pages*.

### En ligne de commande

```bash
cd shona-lexique
git init
git add .
git commit -m "Lexique Shona v1.0.0"
git branch -M main
git remote add origin https://github.com/guillaume-bruelle/shona-lexique.git
git push -u origin main
```

Puis activez Pages comme à l'étape 3 ci-dessus.

## Installation sur le téléphone

| Téléphone | Comment |
|---|---|
| Android (Chrome) | Ouvrir l'adresse → bouton **Installer** dans l'appli, ou menu ⋮ → *Installer l'application* |
| iPhone (Safari) | Ouvrir l'adresse → Partager → **Sur l'écran d'accueil** |

Ouvrez l'appli **une fois avec une connexion** : elle fonctionne ensuite sans réseau.

Pour masquer aussi la barre d'état (Android seulement), remplacez dans `manifest.webmanifest`
`"display": "standalone"` par `"display": "fullscreen"`.

## Tester sur un ordinateur

Le service worker ne fonctionne pas en ouvrant `index.html` directement (`file://`).
Lancez un petit serveur local depuis le dossier :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier une mise à jour

1. Modifiez ou remplacez les fichiers (par exemple un nouveau `lexique.json`).
2. **Incrémentez `VERSION` dans `sw.js`** (`lexique-v1.0.0` → `lexique-v1.1.0`).
   Sans cela, les téléphones gardent l'ancienne version en cache.
3. Commit et push. Au lancement suivant, l'appli affiche « Nouvelle version disponible » → *Recharger*.

## Les mots ajoutés

- Ils sont stockés **sur le téléphone** (IndexedDB), jamais envoyés en ligne ni dans ce dépôt.
- Ils survivent aux mises à jour de l'appli, mais **pas** à sa désinstallation
  ni à l'effacement des données du navigateur.
- **Exportez-les régulièrement** (*Copier mes ajouts* ou *Télécharger le CSV*),
  puis intégrez-les au lexique de base après relecture avec le tuteur.

## Format des données

`lexique.json` est un tableau de lignes ; chaque ligne suit cet ordre de colonnes :

```
[shona, pluriel, classe, francais, categorie, registre, variete, source, note]
```

| Colonne | Valeurs |
|---|---|
| `classe` | classe nominale, ex. `7/8`, `1a`, `9/10` (vide pour verbes et mots-outils) |
| `registre` | `respect` · `neutre` · `argot` |
| `variete` | `zezuru` · `karanga` · `manyika` · vide si non précisée |
| `source` | ex. `Ruzhowa p. 62–63`, `FSI U14`, `Wiktionary (kaikki.org, …)` |

Toutes les entrées ont le statut **« à vérifier »**. Ordre de fiabilité retenu :
tuteur › Hannan / Fortune › FSI › Ruzhowa › Wiktionary.

Le CSV exporté depuis l'appli ajoute la colonne `statut` et suit l'ordre
`shona,pluriel,classe,francais,categorie,registre,variete,source,statut,note`.

## Limites

- **Les tons ne sont pas écrits.** Vérifiez toujours la prononciation à l'audio natif.
- Pas encore d'audio ni de révisions espacées : ce sont les prochaines étapes de Shona Lab.
- Une partie du vocabulaire vient de sources datées (1965, 1997) ou d'autres variétés
  que le zezuru ; ces formes sont signalées dans la note de chaque mot.

## Feuille de route Shona Lab

| Version | Contenu | État |
|---|---|---|
| v0.1 | Coquille PWA hors ligne, IndexedDB, lexique · révisions espacées (FSRS), cartes audio | coquille et lexique livrés |
| v0.2 | Classes nominales, générateur d'accords, exercices de grammaire | à venir |
| v0.3 | Lecteur de textes avec glose, shadowing, dialogues FSI | à venir |
| v0.4 | Carnet de terrain, journal d'erreurs, séances tuteur | à venir |
| v0.5 | Courbe de hauteur (tons), tableau de bord, synchronisation | à venir |

## Sources et droits

Le lexique de base est compilé à partir de :

- **Stevick, E. W. & Mataranyika, M. (1965).** *Shona Basic Course.* Foreign Service Institute.
  Domaine public.
- **Wiktionary**, entrées en shona extraites via [kaikki.org](https://kaikki.org/dictionary/Shona/)
  (consulté le 11/10/2026). Contenu sous licence
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) : les entrées qui en sont tirées
  restent sous cette licence et doivent la mentionner si elles sont réutilisées.
- **Ruzhowa, D. (1997).** *Learning Shona.* Harare : VSO. Ouvrage protégé ; seules des
  correspondances mot à mot de son glossaire sont reprises ici, avec la page citée.

Ce dépôt est un outil d'apprentissage personnel. Si vous le rendez public, vérifiez que cette
diffusion vous convient au regard des sources ci-dessus.
