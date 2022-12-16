// Affiche les recettes 
async function displayRecipes(recipes) {

    await getRecipes();

    recipes.forEach((recipe) => {
        let ingredientsList = "";

        recipe.ingredients.map((e) => {
            ingredientsList += `<li class="card-ingredient">
              <span class="card-ingredient_bold">${e.ingredient ? e.ingredient.trim() : ""}</span> 
              ${e.quantity ? e.quantity.toString().trim() : ""} ${e.unit ? e.unit.toLowerCase().trim() : ""}
             </li>`;

            return ingredientsList;
        });

        cardsSection.insertAdjacentHTML(
            "afterbegin",
            `<article class="card">
                <a href="#">
                    <div class="card-img"></div>
                    <div class="card-body">
                        <div class="card-head">
                            <h2 class="card-title">${recipe.name.trim()}</h2>
                            <div class="card-time">
                                <img class="card-clock" src="../assets/clock.svg" alt="clock icon"/>
                                <p class="card-minutes">${recipe.time.toString().trim()} min</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <ul class="card-ingredients">${ingredientsList}</ul>
                            <p class="card-description">${recipe.description.trim()}</p>
                        </div>
                    </div>
                </a>
            </article>`
        );
    });
}