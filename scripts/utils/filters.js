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

let tagsRecipesArray = [];
let ingredientsArray = [];

async function removeDuplicates(array) {

    ingredientsArray = array.filter((item, index) => { return array.indexOf(item) === index });

}

async function getIngredientsList() {

    ingredientsArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {

        tagsRecipesArray = recipesArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) });


    } else {

        tagsRecipesArray = cardsArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) });

    }

    for (let i of tagsRecipesArray) {

        i.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) {
                ingredientsArray.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase().trim());
            }
        });

    }

    // Supprime les éléments en double dans le tableau
    removeDuplicates(ingredientsArray);

}

async function displayIngredientsList() {

    ingredientsMenu.style.display = "flex";
    // Vide le menu
    ingredientsMenu.innerHTML = "";

    await getIngredientsList();

    for (let i of ingredientsArray) {

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

        // Change l'orientaion de la flèche

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
        `<span> ${target} 
            <span class="tags-close" onclick="removeTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeTag() {

    const tag = document.querySelector(".tags-item")

    tag.remove();

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

        console.log(target.innerHTML);
        addIngredientsTag(target.innerHTML);

    }
});