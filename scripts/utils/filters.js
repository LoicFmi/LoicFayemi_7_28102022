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
const filterItem = document.querySelector(".filter-custom-option");
const tagsSection = document.querySelector(".tags");
const ingredientsTagsValue = document.getElementsByClassName("tag-ingredient-value");
const appliancesTagsValue = document.getElementsByClassName("tag-appliance-value");
const ustensilsTagsValue = document.getElementsByClassName("tag-ustensil-value");
const tags = document.querySelector(".tags");


let tagsRecipesArray = [];
let tagValueArray = [];
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

async function removeDuplicates(array) {

    tagValueArray = array.filter((item, index) => { return array.indexOf(item) === index });

}

async function checkTagsValues() {

    for (let val of ingredientsTagsValue) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(val.innerText.toLowerCase().trim())) });
    }

    for (let val of appliancesTagsValue) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.appliance.toLowerCase().trim().includes(val.innerText.toLowerCase().trim()) });
    }

    for (let val of ustensilsTagsValue) {
        tagsRecipesArray = tagsRecipesArray.filter(r => { return r.ustensils.some(u => u.toLowerCase().trim().includes(val.innerText.toLowerCase().trim())) });
    }

}

// INGREDIENTS //

async function getIngredientsList() {

    tagValueArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        ingredientsArray = recipesArray;
    } else {
        ingredientsArray = cardsArray;
    }

    tagsRecipesArray = ingredientsArray.filter(r => { return r.ingredients.some(i => i.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) });

    await checkTagsValues();

    for (let i of tagsRecipesArray) {

        i.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().trim().includes(ingredientsSearch.value.toLowerCase().trim())) {
                tagValueArray.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase().trim());
            }
        });

    }

    // Supprime les ??l??ments en double dans le tableau
    removeDuplicates(tagValueArray);

}

async function displayIngredientsList() {

    ingredientsMenu.style.display = "flex";
    // Vide le menu
    ingredientsMenu.innerHTML = "";

    await getIngredientsList();

    for (let i of tagValueArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter-custom-option", "li-ingredient");
        btn.innerHTML = i;
        ingredientsMenu.appendChild(btn);

    };

}

function openIngredientsFilter() {

    closeAppliancesFilter();
    closeUstensilsFilter();

    if (ingredientsSearch.type == "button") {

        filterIngredient.style.width = "66%";

        ingredientsSearch.type = "text";
        ingredientsSearch.value = "";
        ingredientsSearch.placeholder = "Rechercher un ingr??dient";
        ingredientsSearch.focus();

        // Change l'orientation de la fl??che
        ingredientsArrow.classList.remove("fa-angle-down");
        ingredientsArrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayIngredientsList();

    }

}

function closeIngredientsFilter() {

    filterIngredient.style.width = "170px";

    ingredientsSearch.type = "button";
    ingredientsSearch.value = "Ingr??dients";
    ingredientsSearch.removeAttribute("placeholder");


    // Change l'orientation de la fl??che

    ingredientsArrow.classList.remove("fa-angle-up");
    ingredientsArrow.classList.add("fa-angle-down");

    // Cache la liste
    ingredientsMenu.style.display = "none";

}

function openCloseIngredientsFilter() {

    if (ingredientsSearch.type == "text") {

        filterIngredient.style.width = "170px";

        ingredientsSearch.type = "button";
        ingredientsSearch.value = "Ingr??dients";
        ingredientsSearch.removeAttribute("placeholder");


        // Change l'orientation de la fl??che

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
        `<span class="tag-ingredient-value"> ${target}
            <span class="tags-close" onclick="removeIngredientTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeIngredientTag(target) {

    target.remove();
    cardsSection.innerHTML = "";
    getIngredientsList();

}

// D??clenche la recherche par ingr??dients lorsque l'utilisateur entre un caract??re dans le filtre ingr??dients
ingredientsSearch.addEventListener('keyup', function () {
    // Vide la section cards
    ingredientsMenu.innerHTML = "";
    displayIngredientsList();
});

// Ajoute l'ingr??dient cliqu?? aux tags
document.addEventListener('click', function (e) {

    const target = e.target.closest(".li-ingredient");

    if (target) {

        addIngredientsTag(target.innerHTML);
        getIngredientsList();
        displayIngredientsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        displayRecipes(tagsRecipesArray);

    }

});

// Retire l'ingr??dient cliqu?? des tags
tags.addEventListener('click', function (e) {

    const target = e.target.closest(".tags-ingredients");

    if (target) {

        removeIngredientTag(target);
        closeIngredientsFilter();
        getIngredientsList();
        displayIngredientsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        constructCardsSection();

    }

});


// APPLIANCES //

async function getAppliancesList() {

    tagValueArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        appliancesArray = recipesArray;
    } else {
        appliancesArray = cardsArray;
    }

    tagsRecipesArray = appliancesArray.filter(r => { return r.appliance.toLowerCase().trim().includes(appliancesSearch.value.toLowerCase().trim()) });

    await checkTagsValues();

    for (let i of tagsRecipesArray) {

        if (i.appliance.toLowerCase().trim().includes(appliancesSearch.value.toLowerCase().trim())) {
            tagValueArray.push(i.appliance.charAt(0).toUpperCase() + i.appliance.slice(1).toLowerCase().trim());
        }

    }

    // Supprime les ??l??ments en double dans le tableau
    removeDuplicates(tagValueArray);

}

async function displayAppliancesList() {

    appliancesMenu.style.display = "flex";
    // Vide le menu
    appliancesMenu.innerHTML = "";

    await getAppliancesList();

    for (let i of tagValueArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter-custom-option", "li-appliance");
        btn.innerHTML = i;
        appliancesMenu.appendChild(btn);

    };

}

function openAppliancesFilter() {

    closeIngredientsFilter();
    closeUstensilsFilter();

    if (appliancesSearch.type == "button") {

        filterAppliance.style.width = "66%";

        appliancesSearch.type = "text";
        appliancesSearch.value = "";
        appliancesSearch.placeholder = "Rechercher un appareil";
        appliancesSearch.focus();

        // Change l'orientation de la fl??che
        appliancesArrow.classList.remove("fa-angle-down");
        appliancesArrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayAppliancesList();

    }

}

function closeAppliancesFilter() {

    filterAppliance.style.width = "170px";

    appliancesSearch.type = "button";
    appliancesSearch.value = "Appareils";
    appliancesSearch.removeAttribute("placeholder");

    // Change l'orientation de la fl??che

    appliancesArrow.classList.remove("fa-angle-up");
    appliancesArrow.classList.add("fa-angle-down");

    // Cache la liste
    appliancesMenu.style.display = "none";

}

function openCloseAppliancesFilter() {

    if (appliancesSearch.type == "text") {

        filterAppliance.style.width = "170px";

        appliancesSearch.type = "button";
        appliancesSearch.value = "Appareils";
        appliancesSearch.removeAttribute("placeholder");


        // Change l'orientation de la fl??che

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
        `<span class="tag-appliance-value"> ${target}
            <span class="tags-close" onclick="removeApplianceTag()">
                <i class="fa-regular fa-circle-xmark"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeApplianceTag(target) {

    target.remove();
    cardsSection.innerHTML = "";
    getAppliancesList();

}

// D??clenche la recherche par appareils lorsque l'utilisateur entre un caract??re dans le filtre appareils
appliancesSearch.addEventListener('keyup', function () {

    // Vide la section cards
    appliancesMenu.innerHTML = "";
    displayAppliancesList();

});

// Ajoute l'appareil cliqu?? aux tags
document.addEventListener('click', function (e) {

    const target = e.target.closest(".li-appliance");

    if (target) {

        addAppliancesTag(target.innerHTML);
        getAppliancesList();
        displayAppliancesList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        displayRecipes(tagsRecipesArray);

    }

});

// Retire l'appareil cliqu?? des tags
tags.addEventListener('click', function (e) {

    const target = e.target.closest(".tags-appliances");

    if (target) {

        removeApplianceTag(target);
        closeAppliancesFilter();
        getAppliancesList();
        displayAppliancesList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        constructCardsSection();

    }

});


// USTENSILS //

async function getUstensilsList() {

    tagValueArray.length = 0;
    tagsRecipesArray.length = 0;

    if (cardsArray.length == 0) {
        ustensilsArray = recipesArray;
    } else {
        ustensilsArray = cardsArray;
    }

    tagsRecipesArray = ustensilsArray.filter(r => { return r.ustensils.some(u => u.toLowerCase().trim().includes(ustensilsSearch.value.toLowerCase().trim())) });

    await checkTagsValues();

    for (let i of tagsRecipesArray) {

        i.ustensils.forEach(ustensil => {
            if (ustensil.toLowerCase().trim().includes(ustensilsSearch.value.toLowerCase().trim())) {
                tagValueArray.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase().trim());
            }
        });

    }

    // Supprime les ??l??ments en double dans le tableau
    removeDuplicates(tagValueArray);

}

async function displayUstensilsList() {

    ustensilsMenu.style.display = "flex";
    // Vide le menu
    ustensilsMenu.innerHTML = "";

    await getUstensilsList();

    for (let i of tagValueArray) {

        const btn = document.createElement("li");
        btn.classList.add("filter-custom-option", "li-ustensil");
        btn.innerHTML = i;
        ustensilsMenu.appendChild(btn);

    };

}

function openUstensilsFilter() {

    closeIngredientsFilter();
    closeAppliancesFilter();

    if (ustensilsSearch.type == "button") {

        filterUstensil.style.width = "66%";

        ustensilsSearch.type = "text";
        ustensilsSearch.value = "";
        ustensilsSearch.placeholder= "Rechercher un ustensile";
        ustensilsSearch.focus();

        // Change l'orientation de la fl??che
        ustensilsArrow.classList.remove("fa-angle-down");
        ustensilsArrow.classList.add("fa-angle-up");

        // Affiche la liste
        displayUstensilsList();

    }

}

function closeUstensilsFilter() {

    filterUstensil.style.width = "170px";

    ustensilsSearch.type = "button";
    ustensilsSearch.value = "Ustensiles";
    ustensilsSearch.removeAttribute("placeholder");

    // Change l'orientation de la fl??che

    ustensilsArrow.classList.remove("fa-angle-up");
    ustensilsArrow.classList.add("fa-angle-down");

    // Cache la liste
    ustensilsMenu.style.display = "none";

}

function openCloseUstensilsFilter() {

    if (ustensilsSearch.type == "text") {

        filterUstensil.style.width = "170px";

        ustensilsSearch.type = "button";
        ustensilsSearch.value = "Ustensiles";
        ustensilsSearch.removeAttribute("placeholder");

        // Change l'orientation de la fl??che

        ustensilsArrow.classList.remove("fa-angle-up");
        ustensilsArrow.classList.add("fa-angle-down");

        // Cache la liste
        ustensilsMenu.style.display = "none";

    } else {

        openUstensilsFilter();

    }

}

function addUstensilsTag(target) {

    const tag = document.createElement("span");

    tag.classList.add("tags-item", "tags-ustensils");
    tag.innerHTML =
        `<span class="tag-ustensil-value"> ${target}
            <span class="tags-close" onclick="removeUstensilTag()">
                <i class="fa-regular fa-circle-xmark tags-close"></i>
            </span>
        </span>`;

    tagsSection.appendChild(tag);

}

function removeUstensilTag(target) {

    target.remove();
    cardsSection.innerHTML = "";
    getUstensilsList();

}

// D??clenche la recherche par ustensiles lorsque l'utilisateur entre un caract??re dans le filtre ustensiles
ustensilsSearch.addEventListener('keyup', function () {

    // Vide la section cards
    ustensilsMenu.innerHTML = "";
    displayUstensilsList();

});

// Ajoute l'ustensil cliqu?? aux tags
document.addEventListener('click', function (e) {

    const target = e.target.closest(".li-ustensil");

    if (target) {

        addUstensilsTag(target.innerHTML);
        getUstensilsList();
        displayUstensilsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        displayRecipes(tagsRecipesArray);

    }

});

// Retire l'ustensil cliqu?? des tags
tags.addEventListener('click', function (e) {

    const target = e.target.closest(".tags-ustensils");

    if (target) {

        removeUstensilTag(target);
        closeUstensilsFilter();
        getUstensilsList();
        displayUstensilsList();
        // Vide la section cards
        cardsSection.innerHTML = "";
        constructCardsSection();

    }

});
