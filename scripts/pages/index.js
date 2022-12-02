const mainSearch = document.querySelector(".search-input");

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

let cardsArray = [];

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
        console.log(cardsArray);
    } else {
        console.log('Aucune recette ne correspond à votre critère…')
    }
}

// Déclenche la recherche lorsque plus de 2 caractères sont entrés dans la barre de recherche principale
mainSearch.addEventListener('keyup', function () {
    console.clear();
    if (mainSearch.value.length > 2) {
        mainSearchBar();
    }
});



// // Récupère les recettes correspondant à la recherche effectuée (filter())
// async function mainSearchBar(recipes, value) {

//     await getRecipes();

//     cardsArray.length = 0;

//     cardsArray = recipes.filter(r => { return r.name.toLowerCase().trim().includes(value.toLowerCase().trim()) || r.description.toLowerCase().trim().includes(value.toLowerCase().trim()) || r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(value.toLowerCase().trim())) });

//     if (cardsArray.length !== 0) {
//         console.log(cardsArray);
//     } else {
//         console.log('Aucune recette ne correspond à votre critère…')
//     }

// }

// // Déclenche la recherche lorsque plus de 2 caractères sont entrés dans la barre de recherche principale (filter())
// mainSearch.addEventListener('keyup', function () {
//     console.clear();
//     if (mainSearch.value.length > 2) {
//         mainSearchBar(recipesArray, mainSearch.value);
//     }
// });