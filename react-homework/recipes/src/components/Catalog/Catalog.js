import React, { useState, useEffect } from "react";
import EachCard from "./Card/Card";
import style from "../Catalog/Catalog.module.css";
import { TextField, Button } from "@mui/material";

function Catalog() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then((recipeArr) => setRecipes(recipeArr.slice(0, 10)))
      .catch((err) => console.log(err));
  }, []);

  const searchChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/posts?title=${title}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <form className={style.search}>
        <TextField
          sx={{ width: 400 }}
          id="outlined-uncontrolled"
          label="Search for a recipe"
          onChange={searchChangeHandler}
        />
        <Button
          sx={{
            color: "black",
            ml: "10px",
            backgroundColor: "gray",
            width: "70px",
            height: "55px",
          }}
          onClick={submitHandler}
        >
          Search
        </Button>
      </form>
      <h1>Recipes</h1>
      <div className={style.container}>
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
      </div>
    </div>
  );
}

export default Catalog;
