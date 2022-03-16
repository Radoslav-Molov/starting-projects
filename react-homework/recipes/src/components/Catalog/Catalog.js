import React, { useState } from "react";
import EachCard from "./Card/Card";

function Catalog() {
  const [recipes, setRecipes] = useState("");

  fetch("http://localhost:8080/posts")
    .then((res) => res.json())
    .then((recipeArr) => setRecipes(recipeArr))
    .catch((err) => console.log(err));
  return (
    <div>
      <h1>Recipes</h1>
      {/* <div>
        {recipes.map((x) => (
          <EachCard
            key={x.id}
            id={x.id}
            title={x.title}
            summary={x.summary}
            prepTime={x.prepTime}
            ingredients={x.ingredients}
            image={x.image}
            fullDescription={x.fullDescription}
            tags={x.tags}
            dateCreated={x.dateCreated}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Catalog;
