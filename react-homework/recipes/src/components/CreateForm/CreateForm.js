import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";

function CreateForm({ isEditMode, changeCurrentPath }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [tags, setTags] = useState("");
  const [validInputs, setValidInputs] = useState(false);
  const [date, setDate] = useState("");
  const [id, setId] = useState(window.location.pathname.split("/")[2]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const summaryChangeHandler = (event) => {
    setSummary(event.target.value);
  };
  const prepTimeChangeHandler = (event) => {
    setPrepTime(event.target.value);
  };
  const ingredientsChangeHandler = (event) => {
    setIngredients(event.target.value);
  };
  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setFullDescription(event.target.value);
  };
  const tagsChangeHandler = (event) => {
    setTags(event.target.value);
  };
  useEffect(() => {
    const today = new Date();
    setDate(
      `${today.getFullYear()}/${
        today.getMonth() + 1
      }/${today.getDate()} - ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    );
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      fetch(`http://localhost:8080/posts/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setTitle(data.title);
          setSummary(data.summary);
          setPrepTime(data.prepTime);
          setIngredients(data.ingredients);
          setImage(data.image);
          setFullDescription(data.fullDescription);
          setTags(data.tags);
          setValidInputs(true);
        });
    }
  }, []);

  const [user, setUser] = useState("");
  useEffect(() => {
    if (!window.localStorage) {
      setUser("");
    } else {
      const userKey = Object.keys(window.localStorage);
      setUser(userKey[0]);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      user !== undefined &&
      title !== "" &&
      title.length <= 80 &&
      summary.length <= 256 &&
      fullDescription.length <= 2048
    ) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
      return;
    }

    if (isEditMode) {
      fetch(`http://localhost:8080/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          prepTime: prepTime,
          ingredients: ingredients,
          image: image,
          fullDescription: fullDescription,
          tags: tags,
          // dateCreated: Date().toLocaleString(),
          dateEdited: date,
          user: user,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          window.history.pushState({}, "", "/recipes");
          changeCurrentPath("/recipes");
        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          prepTime: prepTime,
          ingredients: ingredients,
          image: image,
          fullDescription: fullDescription,
          tags: tags,
          // dateCreated: Date().toLocaleString(),
          dateCreated: date,
          user: user,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          window.history.pushState({}, "", "/recipes");
          changeCurrentPath("/recipes");
        })
        .catch((err) => console.log(err));
    }

    setTitle("");
    setSummary("");
    setPrepTime("");
    setIngredients("");
    setImage("");
    setFullDescription("");
    setTags("");
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid sx={{ maxWidth: "30%", m: "auto" }}>
        <Paper elevation={10}>
          <Grid align="center">
            {isEditMode ? <h2>Edit recipe</h2> : <h2>Create recipe</h2>}
          </Grid>
          <TextField
            sx={{ m: 2, width: "70%" }}
            label="Title"
            variant="outlined"
            placeholder="Enter title"
            fullWidth
            required
            onChange={titleChangeHandler}
            value={title}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Short description"
            placeholder="Enter short description"
            type="text"
            fullWidth
            multiline
            minRows={3}
            required
            onChange={summaryChangeHandler}
            value={summary}
          />

          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Preparation time"
            placeholder="Enter preparation time"
            type="text"
            fullWidth
            required
            onChange={prepTimeChangeHandler}
            value={prepTime}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Ingredients"
            placeholder="Enter ingredients"
            type="text"
            fullWidth
            required
            onChange={ingredientsChangeHandler}
            value={ingredients}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Picture url"
            placeholder="Enter picture url"
            type="url"
            fullWidth
            required
            onChange={imageChangeHandler}
            value={image}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Full description"
            placeholder="Enter Full description"
            type="text"
            fullWidth
            multiline
            minRows={3}
            required
            onChange={descriptionChangeHandler}
            value={fullDescription}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="outlined"
            label="Tags"
            placeholder="Enter Tags"
            type="text"
            fullWidth
            required
            onChange={tagsChangeHandler}
            value={tags}
          />
          {!validInputs && (
            <p style={{ color: "red" }}>Form is not filled correctly.</p>
          )}
          <Button
            sx={{ m: 2, width: "40%" }}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Add repice
          </Button>
        </Paper>
      </Grid>
    </form>
  );
}

export default CreateForm;
