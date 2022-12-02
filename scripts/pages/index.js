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

// Affiche les recettes 
async function displayRecipes(recipes) {

    await getRecipes();

    recipes.forEach((recipe) => {
        let ingredientsList = "";

        recipe.ingredients.map((e) => {
            ingredientsList += `<li class="card_ingredient">
              <span class="card_ingredient_bold">${e.ingredient ? e.ingredient.trim() : ""}</span> 
              ${e.quantity ? e.quantity.toString().trim() : ""} ${e.unit ? e.unit.toLowerCase().trim() : ""}
             </li>`;

            return ingredientsList;
        });

        cardsSection.insertAdjacentHTML(
            "afterbegin",
            `<article class="card">
                <a href="#">
                    <div class="card_img"></div>
                    <div class="card_body">
                        <div class="card_head">
                            <h2 class="card_title">${recipe.name.trim()}</h2>
                            <div class="card_time">
                                <img class="card_clock" src="../assets/clock.svg" alt="clock icon"/>
                                <p class="card_minutes">${recipe.time.toString().trim()} min</p>
                            </div>
                        </div>
                        <div class="card_content">
                            <ul class="card_ingredients">${ingredientsList}</ul>
                            <p class="card_description">${recipe.description.trim()}</p>
                        </div>
                    </div>
                </a>
            </article>`
        );
    });
}

async function init() {

    await getRecipes();
    displayRecipes(recipesArray);

}

init();