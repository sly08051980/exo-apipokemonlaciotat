const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000; // Vous pouvez choisir le port que vous préférez

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Définir le chemin du répertoire où se trouve votre fichier index.html
const publicPath = path.join(__dirname, 'public');

// Configurer Express pour utiliser les fichiers statiques dans le répertoire public
app.use(express.static(publicPath));

// Définir la route vers le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/cartes',async (req,res)=>{
try {

  const { nom, type, imageSrc }=req.body;

  const pokemonList = await fs.readFile('pokemonList.json','utf-8');
  const parsedPokemonList =JSON.parse(pokemonList);

  const newPokemon ={ nom, type, imageSrc};
  parsedPokemonList.push(newPokemon);
  await fs.writeFile('pokemonList.json',JSON.stringify(parsedPokemonList,null,2));

  res.status(200).send('Carte pokemon ajouter');
  
} catch (error) {
  console.error('Erreur lors du traitement de la requête POST :', error);
  res.status(500).send('Une erreur est survenue lors de l\'ajout de la carte Pokémon.');
 

}
})
// Ajoutez une route pour la recherche par nom
app.get('/cartes', async (req, res) => {
  try {
    // Récupérez le nom de la requête GET
    const nomRecherche = req.query.nom;

    // Chargez la liste complète des cartes depuis le fichier JSON
    const pokemonList = await fs.readFile('pokemonList.json', 'utf-8');
    const parsedPokemonList = JSON.parse(pokemonList);

    // Filtrez les cartes Pokémon en fonction du nom de recherche
    const cartesFiltrees = parsedPokemonList.filter((pokemon) =>
      pokemon.nom.toLowerCase().includes(nomRecherche.toLowerCase())
    );

    // Répondez avec la liste filtrée
    res.status(200).json(cartesFiltrees);
  } catch (error) {
    console.error('Erreur lors de la recherche de cartes Pokémon :', error);
    res.status(500).send('Une erreur est survenue lors de la recherche de cartes Pokémon.');
  }
});
app.get('/list', async (req, res) => {
  try {
    // Lisez le fichier pokemonList.json
    const listPokemon = await fs.readFile('pokemonList.json', 'utf-8');
    const parsedList = JSON.parse(listPokemon);

    res.status(200).json(parsedList); // Envoyez la liste complète en réponse
  } catch (error) {
    console.error('Erreur lors de l\'affichage de cartes Pokémon :', error);
    res.status(500).send('Une erreur est survenue lors de la recherche de cartes Pokémon.');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});