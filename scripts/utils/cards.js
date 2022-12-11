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