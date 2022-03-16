import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [tags, setTags] = useState("");
  const [validInputs, setValidInputs] = useState(false);

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      title.length <= 80 &&
      summary.length <= 256 &&
      fullDescription <= 2048
    ) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
      return;
    }

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
        dateCreated: Date().toLocaleString(),
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid sx={{ maxWidth: "30%", m: "auto" }}>
        <Paper elevation={10}>
          <Grid align="center">
            <h2>Create recipe</h2>
          </Grid>
          <TextField
            sx={{ m: 2, width: "70%" }}
            label="Title"
            variant="standard"
            placeholder="Enter title"
            fullWidth
            required
            onChange={titleChangeHandler}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Short description"
            placeholder="Enter short description"
            type="text"
            fullWidth
            multiline
            minRows={3}
            required
            onChange={summaryChangeHandler}
          />

          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Preparation time"
            placeholder="Enter preparation time"
            type="text"
            fullWidth
            required
            onChange={prepTimeChangeHandler}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Ingredients"
            placeholder="Enter ingredients"
            type="text"
            fullWidth
            required
            onChange={ingredientsChangeHandler}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Picture url"
            placeholder="Enter picture url"
            type="url"
            fullWidth
            required
            onChange={imageChangeHandler}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Full description"
            placeholder="Enter Full description"
            type="text"
            fullWidth
            multiline
            minRows={3}
            required
            onChange={descriptionChangeHandler}
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            variant="standard"
            label="Tags"
            placeholder="Enter Tags"
            type="text"
            fullWidth
            required
            onChange={tagsChangeHandler}
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
