console.log("sript charger");

document.addEventListener('DOMContentLoaded', () => {
    performSearch();
    const boutonAjouterPokemon = document.getElementById('ajouterPokemon');
   
    const formRecherche = document.forms['onePoke'];


    boutonAjouterPokemon.addEventListener('click', async () => {
      // Récupérer les valeurs du formulaire
      const nom = document.getElementById('nom').value;
      const type = document.getElementById('type').value;
      const imageSrc = document.getElementById('imageSrc').value;
  
      // Envoyer les données au serveur via une requête POST
      try {
        const response = await fetch('/cartes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, type, imageSrc }),
        });
  
        if (response.ok) {
          console.log('Carte Pokémon ajoutée avec succès!');
          // Vous pouvez ajouter ici du code pour gérer la réponse du serveur en cas de succès
        } else {
          console.error('Erreur lors de l\'ajout de la carte Pokémon.');
          // Vous pouvez ajouter ici du code pour gérer la réponse du serveur en cas d'erreur
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête:', error);
      }
    });

    formRecherche.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const nomRecherche = document.getElementById('nomCarte').value;
    
        // Envoyez une requête GET au serveur avec le nom de recherche
        try {
          const response = await fetch(`/cartes?nom=${nomRecherche}`);
          
          if (response.ok) {
            const cartesFiltrees = await response.json();
            
            // Affichez les cartes filtrées, par exemple, dans la console
            console.log('Cartes filtrées :', cartesFiltrees);
            
            // Vous pouvez ajouter ici du code pour afficher les cartes filtrées dans votre interface utilisateur
          } else {
            console.error('Erreur lors de la recherche de cartes Pokémon.');
            // Vous pouvez ajouter ici du code pour gérer la réponse du serveur en cas d'erreur
          }
        } catch (error) {
          console.error('Erreur lors de l\'envoi de la requête GET :', error);
        }
      });

      //nouveau

      
      
  });
  const performSearch = async () => {
    try {
      const response = await fetch('/list');
     
      if (response.ok) {
        const pokemonList = await response.json();
        console.log(pokemonList)
        displayPokemonList(pokemonList);
      } else {
        console.error('Erreur lors de la récupération de la liste des Pokémon.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des Pokémon :', error);
    }
  };
  // Fonction pour mettre à jour la table des Pokémon
const displayPokemonList = (pokemonList) => {
    const tableBody = document.getElementById('pokemonList');
    tableBody.innerHTML = ''; // Effacez le contenu actuel de la table
  
    // Boucle à travers la liste des Pokémon et ajoutez des lignes à la table
    pokemonList.forEach((pokemon) => {
      // ... votre code existant pour ajouter une ligne à la table ...
    });
  };
