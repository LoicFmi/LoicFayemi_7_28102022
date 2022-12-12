const filterCustom = document.querySelector(".filter-custom")
const ingredientsSearch = document.querySelector(".ingredients-filter");
const appliancesSearch = document.querySelector(".appliances-filter");
const ustensilesSearch = document.querySelector(".ustensiles-filter");
const ingredientsMenu = document.querySelector(".ingredients-menu");
const appliancesMenu = document.querySelector(".appliances-menu");
const ustensilesMenu = document.querySelector(".ustensiles-menu");
const arrow = document.querySelector(".arrow");
const filterItem = document.querySelector(".filter_custom-option");
const tagsSection = document.querySelector(".tags");
const ingredientsTags = document.getElementsByClassName("ingredient-tag");


let tagsRecipesArray = [];
let ingredientsTagsArray = [];
let ingredientsArray = [];

async function removeDuplicates(array) {

    ingredientsTagsArray = array.filter((item, index) => { return array.indexOf(item) === index });

}

async function getIngredientsList() {

    ingredientsTagsArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        ingredientsArray = recipesArray;
    } else {
        ingredientsArray = cardsArray;
    }

    tagsRecipesArray = ingredientsArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) });

    let id = 0;
    for (let ing of ingredientsTags) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ing.innerText.toLowerCase().trim())) });
        id++;
    }

    for (let i of tagsRecipesArray) {

        i.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) {
                ingredientsTagsArray.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase().trim());
            }
        });

    }

    // Supprime les éléments en double dans le tableau
    removeDuplicates(ingredientsTagsArray);

}

async function displayIngredientsList() {

    ingredientsMenu.style.display = "flex";
    // Vide le menu
    ingredientsMenu.innerHTML = "";

    await getIngredientsList();

    for (let i of ingredientsTagsArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter_custom-option");
        btn.innerHTML = i;
        ingredientsMenu.appendChild(btn);

    };

}

function openIngredientsFilter() {

    if (ingredientsSearch.type == "button") {

        filterCustom.style.width = "66%";

        ingredientsSearch.type = "text";
        ingredientsSearch.value = "";
        ingredientsSearch.focus();

        // Change l'orientaion de la flèche
        arrow.classList.remove("fa-angle-down");
        arrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayIngredientsList();

    }

}

function openCloseIngredientsFilter() {


    if (ingredientsSearch.type == "text") {

        filterCustom.style.width = "170px";

        ingredientsSearch.type = "button";
        ingredientsSearch.value = "Ingrédients";

        // Change l'orientation de la flèche

        arrow.classList.remove("fa-angle-up");
        arrow.classList.add("fa-angle-down");

        // Cache la liste
        ingredientsMenu.style.display = "none";

    } else {

        openIngredientsFilter();

    }

}

function addIngredientsTag(target) {

    const tag = document.createElement("span");

    tag.classList.add("tags-item", "tags-ingredients");
    tag.innerHTML =
        `<span class="ingredient-tag"> ${target}
            <span class="tags-close" onclick="removeIngredientTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeIngredientTag(target) {

    // const tag = document.querySelector(".tags-item")

    target.remove();

    getIngredientsList();

}

// Déclenche la recherche par ingrédients lorsque l'utilisateur entre un caractère dans le filtre ingrédients
ingredientsSearch.addEventListener('keyup', function () {
    console.clear();
    // Vide la section cards
    ingredientsMenu.innerHTML = "";
    displayIngredientsList();
});


// Ajoute l'ingrédient cliqué aux tags
document.addEventListener('click', function (e) {
    console.clear();
    const target = e.target.closest(".filter_custom-option");

    if (target) {

        addIngredientsTag(target.innerHTML);
        target.classList.remove("filter_custom-option");
        target.classList.add("filter_custom-option--disable");
        getIngredientsList();
        displayIngredientsList();

    }

    console.log(tagsRecipesArray);

});

// Retire l'ingrédient cliqué des tags
document.addEventListener('click', function (e) {
    console.clear();
    const target = e.target.closest(".tags-item");

    if (target) {

        removeIngredientTag(target);
        target.classList.remove("filter_custom-option--disable");
        target.classList.add("filter_custom-option");
        getIngredientsList();
        displayIngredientsList();

    }

    console.log(tagsRecipesArray);

});
