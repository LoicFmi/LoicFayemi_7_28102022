const mainSearch = document.querySelector(".search-input");
const cardsSection = document.querySelector(".cards");

let recipesArray = [];

// Récupération des recettes
async function getRecipes() {
    
    return fetch('./data/recipes.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        recipesArray = data.recipes;
    })
    .catch(function (error) {
        console.error('Erreur fetch');
        console.log(error);
    });
}

let cardsArray = recipesArray;

// Affiche les recettes sur la page au chargement
async function init() {

    await getRecipes();
    displayRecipes(recipesArray);

}

init();


// Récupère les recettes correspondant à la recherche effectuée 
async function mainSearchBar() {

    cardsArray.length = 0;
    let containIngredient;

    await getRecipes();

    for (let i of recipesArray) {

        i.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().trim().includes(mainSearch.value.toLowerCase().trim())) {
                containIngredient === true;
            }
        });

        if (i.name.toLowerCase().trim().includes(mainSearch.value.toLowerCase().trim()) ||
            i.description.toLowerCase().trim().includes(mainSearch.value.toLowerCase().trim()) ||
            containIngredient === true) {
            cardsArray.push(i);
        }
    }

    if (cardsArray.length !== 0) {
        displayRecipes(cardsArray);
    } else {
        cardsSection.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
    }
}

// Déclenche la recherche lorsque plus de 2 caractères sont entrés dans la barre de recherche principale
mainSearch.addEventListener('keyup', function () {
    console.clear();
    if (mainSearch.value.length > 2) {
        // Vide la section cards
        cardsSection.innerHTML = "";
        mainSearchBar();
    } else {
        init();
    }
});