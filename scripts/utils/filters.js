const filterIngredient = document.querySelector(".filter-ingredient")
const filterAppliance = document.querySelector(".filter-appliance")
const filterUstensil = document.querySelector(".filter-ustensil")
const ingredientsSearch = document.querySelector(".ingredients-filter");
const appliancesSearch = document.querySelector(".appliances-filter");
const ustensilsSearch = document.querySelector(".ustensils-filter");
const ingredientsMenu = document.querySelector(".ingredients-menu");
const appliancesMenu = document.querySelector(".appliances-menu");
const ustensilsMenu = document.querySelector(".ustensils-menu");
const ingredientsArrow = document.querySelector(".ingredients-arrow");
const appliancesArrow = document.querySelector(".appliances-arrow");
const ustensilsArrow = document.querySelector(".ustensils-arrow");
const filterItem = document.querySelector(".filter_custom-option");
const tagsSection = document.querySelector(".tags");
const tagValue = document.getElementsByClassName("tag-value");


let tagsRecipesArray = [];
let tagValueArray = [];
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

async function removeDuplicates(array) {

    tagValueArray = array.filter((item, index) => { return array.indexOf(item) === index });

}


// INGREDIENTS

async function getIngredientsList() {

    tagValueArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        ingredientsArray = recipesArray;
    } else {
        ingredientsArray = cardsArray;
    }

    tagsRecipesArray = ingredientsArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) });

    for (let val of tagValue) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(val.innerText.toLowerCase().trim())) });
    }

    for (let i of tagsRecipesArray) {

        i.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) {
                tagValueArray.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase().trim());
            }
        });

    }

    // Supprime les éléments en double dans le tableau
    removeDuplicates(tagValueArray);

    console.log(tagValueArray);
    console.log(tagsRecipesArray);
    
}

async function displayIngredientsList() {

    ingredientsMenu.style.display = "flex";
    // Vide le menu
    ingredientsMenu.innerHTML = "";

    await getIngredientsList();

    for (let i of tagValueArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter_custom-option", "li-ingredient");
        btn.innerHTML = i;
        ingredientsMenu.appendChild(btn);

    };

}

function openIngredientsFilter() {

    // closeAppliancesFilter();
    // closeUstensilsFilter();

    if (ingredientsSearch.type == "button") {

        filterIngredient.style.width = "66%";

        ingredientsSearch.type = "text";
        ingredientsSearch.value = "";
        ingredientsSearch.focus();

        // Change l'orientation de la flèche
        ingredientsArrow.classList.remove("fa-angle-down");
        ingredientsArrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayIngredientsList();

    }

}
function closeIngredientsFilter() {

    // closeAppliancesFilter();
    // closeUstensilsFilter();

    filterIngredient.style.width = "170px";

    ingredientsSearch.type = "button";
    ingredientsSearch.value = "Ingrédients";

    // Change l'orientation de la flèche

    ingredientsArrow.classList.remove("fa-angle-up");
    ingredientsArrow.classList.add("fa-angle-down");

    // Cache la liste
    ingredientsMenu.style.display = "none";

}

function openCloseIngredientsFilter() {

    // closeAppliancesFilter();
    // closeUstensilsFilter();

    if (ingredientsSearch.type == "text") {

        filterIngredient.style.width = "170px";

        ingredientsSearch.type = "button";
        ingredientsSearch.value = "Ingrédients";

        // Change l'orientation de la flèche

        ingredientsArrow.classList.remove("fa-angle-up");
        ingredientsArrow.classList.add("fa-angle-down");

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
        `<span class="tag-value"> ${target}
            <span class="tags-close" onclick="removeIngredientTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeIngredientTag(target) {

    target.remove();

    getIngredientsList();

}

// Déclenche la recherche par ingrédients lorsque l'utilisateur entre un caractère dans le filtre ingrédients
ingredientsSearch.addEventListener('keyup', function () {
    // console.clear();
    // Vide la section cards
    ingredientsMenu.innerHTML = "";
    displayIngredientsList();
    // console.log(tagsRecipesArray);
});


// Ajoute l'ingrédient cliqué aux tags
document.addEventListener('click', function (e) {
    // console.clear();
    const target = e.target.closest(".li-ingredient");

    if (target) {

        addIngredientsTag(target.innerHTML);
        target.classList.remove("filter_custom-option");
        target.classList.add("filter_custom-option--disable");
        getIngredientsList();
        displayIngredientsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        displayRecipes(tagsRecipesArray);

    }

    // console.log(tagsRecipesArray);

});

// Retire l'ingrédient cliqué des tags
document.addEventListener('click', function (e) {
    // console.clear();
    const target = e.target.closest(".tags-ingredients");

    if (target) {

        removeIngredientTag(target);
        target.classList.remove("filter_custom-option--disable");
        target.classList.add("filter_custom-option");
        closeIngredientsFilter();
        getIngredientsList();
        displayIngredientsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        constructCardsSection();

    }

    // console.log(tagsRecipesArray);

});



// APPLIANCES

async function getAppliancesList() {

    tagValueArray.length = 0;
    // tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        appliancesArray = recipesArray;
    } else {
        appliancesArray = cardsArray;
    }

    tagsRecipesArray = appliancesArray.filter(r => { return r.appliance.toLowerCase().trim().includes(appliancesSearch.value.toLowerCase().trim()) });

    for (let val of tagValue) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.appliance.toLowerCase().trim().includes(val.innerText.toLowerCase().trim()) });
    }

    for (let i of tagsRecipesArray) {

        if (i.appliance.toLowerCase().trim().includes(appliancesSearch.value.toLowerCase().trim())) {
            tagValueArray.push(i.appliance);
        }

    }

    // Supprime les éléments en double dans le tableau
    removeDuplicates(tagValueArray);

    console.log(tagValueArray);
    console.log(tagsRecipesArray);
}

async function displayAppliancesList() {

    appliancesMenu.style.display = "flex";
    // Vide le menu
    appliancesMenu.innerHTML = "";

    await getAppliancesList();

    for (let i of tagValueArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter_custom-option", "li-appliance");
        btn.innerHTML = i;
        appliancesMenu.appendChild(btn);

    };

}

function openAppliancesFilter() {

    // closeIngredientsFilter();
    // closeUstensilsFilter();

    if (appliancesSearch.type == "button") {

        filterAppliance.style.width = "66%";

        appliancesSearch.type = "text";
        appliancesSearch.value = "";
        appliancesSearch.focus();

        // Change l'orientation de la flèche
        appliancesArrow.classList.remove("fa-angle-down");
        appliancesArrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayAppliancesList();

    }

}
function closeAppliancesFilter() {

    // closeIngredientsFilter();
    // closeUstensilsFilter();

    filterAppliance.style.width = "170px";

    appliancesSearch.type = "button";
    appliancesSearch.value = "Appareils";

    // Change l'orientation de la flèche

    appliancesArrow.classList.remove("fa-angle-up");
    appliancesArrow.classList.add("fa-angle-down");

    // Cache la liste
    appliancesMenu.style.display = "none";

}

function openCloseAppliancesFilter() {

    // closeIngredientsFilter();
    // closeUstensilsFilter();

    if (appliancesSearch.type == "text") {

        filterAppliance.style.width = "170px";

        appliancesSearch.type = "button";
        appliancesSearch.value = "Appareils";

        // Change l'orientation de la flèche

        appliancesArrow.classList.remove("fa-angle-up");
        appliancesArrow.classList.add("fa-angle-down");

        // Cache la liste
        appliancesMenu.style.display = "none";

    } else {

        openAppliancesFilter();

    }

}

function addAppliancesTag(target) {

    const tag = document.createElement("span");

    tag.classList.add("tags-item", "tags-appliances");
    tag.innerHTML =
        `<span class="tag-value"> ${target}
            <span class="tags-close" onclick="removeApplianceTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeApplianceTag(target) {

    target.remove();

    getAppliancesList();

}

// Déclenche la recherche par ingrédients lorsque l'utilisateur entre un caractère dans le filtre ingrédients
appliancesSearch.addEventListener('keyup', function () {

    // Vide la section cards
    appliancesMenu.innerHTML = "";
    displayAppliancesList();
    
});


// Ajoute l'ingrédient cliqué aux tags
document.addEventListener('click', function (e) {

    const target = e.target.closest(".li-appliance");

    if (target) {

        addAppliancesTag(target.innerHTML);
        target.classList.remove("filter_custom-option");
        target.classList.add("filter_custom-option--disable");
        getAppliancesList();
        displayAppliancesList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        displayRecipes(tagsRecipesArray);

    }

});

// Retire l'ingrédient cliqué des tags
document.addEventListener('click', function (e) {

    const target = e.target.closest(".tags-appliances");

    if (target) {

        removeApplianceTag(target);
        target.classList.remove("filter_custom-option--disable");
        target.classList.add("filter_custom-option");
        closeAppliancesFilter();
        getAppliancesList();
        displayAppliancesList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        constructCardsSection();

    }

});
