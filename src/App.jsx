import { useState, useEffect } from 'react';

const App = () => {
  const [dictionnaires, setDictionnaires] = useState({
    "Mon Vocabulaire Allemand": {
      mots: [],
      regles: []
    }
  });
  const [dictionnaireActif, setDictionnaireActif] = useState("Mon Vocabulaire Allemand");
  const [recherche, setRecherche] = useState("");
  const [nouveauMot, setNouveauMot] = useState({
    allemand: "",
    francais: "",
    type: "nom",
    temps: {},
    notes: ""
  });
  const [nouvelleRegle, setNouvelleRegle] = useState({
    titre: "",
    contenu: "",
    tags: ""
  });
  const [nouveauDictionnaire, setNouveauDictionnaire] = useState("");

  // Charger les données depuis le localStorage
  useEffect(() => {
    const saved = localStorage.getItem('glossio-dictionnaires');
    if (saved) setDictionnaires(JSON.parse(saved));
  }, []);

  // Sauvegarder les données dans le localStorage
  useEffect(() => {
    localStorage.setItem('glossio-dictionnaires', JSON.stringify(dictionnaires));
  }, [dictionnaires]);

  const ajouterMot = () => {
    if (!nouveauMot.allemand || !nouveauMot.francais) return;
    const nouveauxMots = [...dictionnaires[dictionnaireActif].mots, nouveauMot];
    setDictionnaires({
      ...dictionnaires,
      [dictionnaireActif]: { ...dictionnaires[dictionnaireActif], mots: nouveauxMots }
    });
    setNouveauMot({ allemand: "", francais: "", type: "nom", temps: {}, notes: "" });
  };

  const ajouterRegle = () => {
    if (!nouvelleRegle.titre || !nouvelleRegle.contenu) return;
    const nouvellesRegles = [...dictionnaires[dictionnaireActif].regles, nouvelleRegle];
    setDictionnaires({
      ...dictionnaires,
      [dictionnaireActif]: { ...dictionnaires[dictionnaireActif], regles: nouvellesRegles }
    });
    setNouvelleRegle({ titre: "", contenu: "", tags: "" });
  };

  const ajouterDictionnaire = () => {
    if (!nouveauDictionnaire.trim()) return;
    setDictionnaires({
      ...dictionnaires,
      [nouveauDictionnaire]: { mots: [], regles: [] }
    });
    setNouveauDictionnaire("");
  };

  const supprimerDictionnaire = (nom) => {
    const { [nom]: _, ...rest } = dictionnaires;
    setDictionnaires(rest);
    if (dictionnaireActif === nom) {
      setDictionnaireActif(Object.keys(rest)[0] || "");
    }
  };

  const filtrerResultats = () => {
    const dict = dictionnaires[dictionnaireActif];
    if (!dict) return { mots: [], regles: [] };
    const terme = recherche.toLowerCase();
    return {
      mots: dict.mots.filter(mot =>
        mot.allemand.toLowerCase().includes(terme) ||
        mot.francais.toLowerCase().includes(terme) ||
        mot.notes.toLowerCase().includes(terme) ||
        Object.values(mot.temps).some(t =>
          t.some(term => term.toLowerCase().includes(terme))
        )
      ),
      regles: dict.regles.filter(regle =>
        regle.titre.toLowerCase().includes(terme) ||
        regle.contenu.toLowerCase().includes(terme) ||
        regle.tags.toLowerCase().includes(terme)
      )
    };
  };

  const exporterJSON = () => {
    const data = JSON.stringify(dictionnaires, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glossio-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importerJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setDictionnaires(data);
      } catch (err) {
        alert("Erreur lors de l'import : fichier invalide.");
      }
    };
    reader.readAsText(file);
  };

  const resultats = filtrerResultats();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Glossio - Apprentissage de l'allemand</h1>

      {/* Barre de gestion des dictionnaires */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <select
          value={dictionnaireActif}
          onChange={(e) => setDictionnaireActif(e.target.value)}
          className="p-2 border rounded bg-white"
        >
          {Object.keys(dictionnaires).map(dict => (
            <option key={dict} value={dict}>{dict}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nouveau dictionnaire"
          value={nouveauDictionnaire}
          onChange={(e) => setNouveauDictionnaire(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={ajouterDictionnaire}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          + Ajouter
        </button>
        {Object.keys(dictionnaires).length > 1 && (
          <button
            onClick={() => supprimerDictionnaire(dictionnaireActif)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={exporterJSON}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Exporter JSON
          </button>
          <input
            type="file"
            accept=".json"
            onChange={importerJSON}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 cursor-pointer"
          >
            Importer JSON
          </label>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un mot, une règle, un temps..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Formulaire pour ajouter un mot */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Ajouter un mot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Allemand (ex: gehen)"
            value={nouveauMot.allemand}
            onChange={(e) => setNouveauMot({...nouveauMot, allemand: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Français (ex: aller)"
            value={nouveauMot.francais}
            onChange={(e) => setNouveauMot({...nouveauMot, francais: e.target.value})}
            className="p-2 border rounded"
          />
          <select
            value={nouveauMot.type}
            onChange={(e) => setNouveauMot({...nouveauMot, type: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="nom">Nom</option>
            <option value="verbe">Verbe</option>
            <option value="adjectif">Adjectif</option>
            <option value="adverbe">Adverbe</option>
            <option value="autre">Autre</option>
          </select>
          <input
            type="text"
            placeholder="Notes (ex: verbe fort)"
            value={nouveauMot.notes}
            onChange={(e) => setNouveauMot({...nouveauMot, notes: e.target.value})}
            className="p-2 border rounded"
          />
          <button
            onClick={ajouterMot}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 md:col-span-2"
          >
            Ajouter le mot
          </button>
        </div>
      </div>

      {/* Formulaire pour ajouter une règle */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Ajouter une règle de grammaire</h2>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Titre (ex: Conjugaison des verbes forts)"
            value={nouvelleRegle.titre}
            onChange={(e) => setNouvelleRegle({...nouvelleRegle, titre: e.target.value})}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Contenu (ex: Les verbes forts changent de voyelle au Präteritum...)"
            value={nouvelleRegle.contenu}
            onChange={(e) => setNouvelleRegle({...nouvelleRegle, contenu: e.target.value})}
            className="p-2 border rounded"
            rows="3"
          />
          <input
            type="text"
            placeholder="Tags (ex: grammaire, verbes, A1)"
            value={nouvelleRegle.tags}
            onChange={(e) => setNouvelleRegle({...nouvelleRegle, tags: e.target.value})}
            className="p-2 border rounded"
          />
          <button
            onClick={ajouterRegle}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Ajouter la règle
          </button>
        </div>
      </div>

      {/* Résultats de la recherche */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Résultats</h2>
        
        {/* Mots */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Mots ({resultats.mots.length})</h3>
          {resultats.mots.length > 0 ? (
            <ul className="space-y-4">
              {resultats.mots.map((mot, index) => (
                <li key={index} className="p-3 border rounded bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-lg">{mot.allemand}</strong> <span className="text-gray-500">({mot.type})</span>
                      <p className="text-gray-700">{mot.francais}</p>
                      {mot.notes && <p className="text-sm text-gray-500 mt-1">📝 {mot.notes}</p>}
                      {Object.entries(mot.temps).length > 0 && (
                        <div className="mt-2">
                          <strong>Temps :</strong>
                          <ul className="list-disc pl-5 mt-1">
                            {Object.entries(mot.temps).map(([temps, conjugaisons]) => (
                              <li key={temps}>
                                <strong>{temps} :</strong> {conjugaisons.join(", ")}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun mot trouvé.</p>
          )}
        </div>

        {/* Règles */}
        <div>
          <h3 className="font-medium mb-2">Règles ({resultats.regles.length})</h3>
          {resultats.regles.length > 0 ? (
            <ul className="space-y-4">
              {resultats.regles.map((regle, index) => (
                <li key={index} className="p-3 border rounded bg-gray-50">
                  <div>
                    <strong className="text-lg">{regle.titre}</strong>
                    {regle.tags && (
                      <p className="text-sm text-gray-500 mt-1">
                        🏷️ {regle.tags.split(',').map(tag => tag.trim()).join(', ')}
                      </p>
                    )}
                    <p className="mt-2 whitespace-pre-wrap">{regle.contenu}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune règle trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;