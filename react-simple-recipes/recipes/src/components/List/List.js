import React, { useEffect, useState } from "react";
import Item from "./ListItem/ListItem";

function List({ changeCurrentPath }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((arr) => {
        // console.log(arr);
        setRecipes(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>List of all recipes</h1>
      <div>
        {recipes.map((x) => (
          <Item
            key={x.id}
            id={x.id}
            title={x.title}
            summary={x.summary}
            prepTime={x.prepTime}
            ingredients={x.ingredients}
            fullDescription={x.fullDescription}
            tags={x.tags}
            image={x.image}
            email={x.user}
            changeCurrentPath={changeCurrentPath}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
