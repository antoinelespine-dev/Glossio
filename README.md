# Glossio 🇩🇪

**Glossio** est une application web légère pour apprendre l'allemand en centralisant ton vocabulaire, tes règles de grammaire et tes conjugaisons. Tu peux créer plusieurs dictionnaires, ajouter des mots avec leurs conjugaisons, et rechercher facilement dans toutes tes données.

---

## 🚀 Démarrer rapidement

### 1. Cloner le dépôt
```bash
git clone https://github.com/antoinelespine-dev/Glossio.git
cd Glossio
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l'application en local
```bash
npm run dev
```
L'application s'ouvrira automatiquement dans ton navigateur à l'adresse [http://localhost:5173](http://localhost:5173).

---

## 📚 Fonctionnalités

| Fonctionnalité               | Description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| **Gestion des dictionnaires** | Crée, supprime ou renomme des dictionnaires pour organiser ton vocabulaire.               |
| **Ajout de mots**            | Ajoute des mots avec leur traduction, type (nom/verbe/adjectif), conjugaisons et notes.       |
| **Ajout de règles**          | Ajoute des règles de grammaire avec un titre, un contenu et des tags pour les retrouver facilement. |
| **Recherche globale**        | Recherche en temps réel dans tous tes mots, règles et conjugaisons.                        |
| **Sauvegarde locale**        | Tes données sont automatiquement sauvegardées dans le `localStorage` de ton navigateur.     |
| **Export/Import JSON**       | Exporte ou importe tes données pour les sauvegarder ou les partager.                        |

---

## 🛠️ Technologies utilisées

- **Frontend** : [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Stockage** : `localStorage` (pas besoin de backend !)

---

## 📂 Structure du projet

```
Glossio/
├── public/                  # Fichiers statiques
├── src/
│   ├── components/          # Composants React (à venir)
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── styles.css           # Styles globaux (Tailwind)
├── package.json             # Dépendances
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind
└── README.md                # Ce fichier
```

---

## 🌍 Déploiement sur GitHub Pages

Pour déployer Glossio sur GitHub Pages (accessible depuis ton iPhone) :

1. **Active GitHub Pages** :
   - Va dans les paramètres de ton dépôt (`Settings` > `Pages`).
   - Sélectionne la branche `main` et le dossier `/root`.
   - Clique sur **Save**.

2. **Attends quelques minutes** : Ton app sera disponible à l'adresse :
   **https://antoinelespine-dev.github.io/Glossio**

---

## 🤝 Contribuer

Tu veux ajouter une fonctionnalité ou corriger un bug ?
1. **Fork** le dépôt.
2. Crée une branche (`git checkout -b feature/ma-fonctionnalité`).
3. Commite tes modifications (`git commit -m "Ajout de ma fonctionnalité"`).
4. **Push** vers ta branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvre une **Pull Request**.

---

## 📝 Exemples de données

### Mot (verbe)
```json
{
  "allemand": "gehen",
  "francais": "aller",
  "type": "verbe",
  "temps": {
    "Präsens": ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
    "Präteritum": ["ging", "gingst", "ging", "gingen", "gingt", "gingen"]
  },
  "notes": "Verbe fort, changement de voyelle e -> i"
}
```

### Règle de grammaire
```json
{
  "titre": "Conjugaison des verbes forts",
  "contenu": "Les verbes forts changent de voyelle au Präteritum (ex: gehen -> ging).",
  "tags": "grammaire, verbes, A1"
}
```

---

## 🎯 Roadmap

- [x] Gestion des dictionnaires
- [x] Ajout/édition de mots et règles
- [x] Recherche globale
- [x] Sauvegarde locale
- [x] Export/Import JSON
- [ ] **Quiz aléatoires** (pour s'entraîner)
- [ ] **Support des images** (pour associer une image à un mot)
- [ ] **Mode sombre**
- [ ] **Traduction automatique** (via API DeepL)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Tu es libre de l'utiliser, le modifier et le partager comme tu le souhaites.

---

## 🙌 Remerciements

Merci à toi, Antoine, pour l'idée et la collaboration ! 😊
