import React, { useEffect, useState } from "react";
import Item from "./ListItem/ListItem";

function List() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((recipeArr) => setRecipes(recipeArr))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>List of all recipes</h1>
      <div>
        {recipes.map((x) => (
          <Item key={x.id} id={x.id} title={x.title} image={x.image} />
        ))}
      </div>
    </div>
  );
}

export default List;
