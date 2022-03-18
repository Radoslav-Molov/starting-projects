import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import Button from "@mui/material/Button";
import { Avatar, ListItemAvatar } from "@mui/material";

function Item({
  id,
  title,
  image,
  email,
  summary,
  fullDescription,
  tags,
  ingredients,
  prepTime,
  changeCurrentPath,
}) {
  const deleteHandler = (e) => {
    const recipeId = e.currentTarget.parentElement.parentNode.id;
    fetch(`http://localhost:8080/posts/${recipeId}`, {
      method: "DELETE",
    });
  };

  const [user, setUser] = useState("");
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    if (!window.localStorage) {
      setUser("");
    } else {
      const userKey = Object.keys(window.localStorage);
      setUser(userKey[0]);
    }
  }, []);

  setTimeout(() => {
    if (user === "admin@gmail.com" || user === email) {
      setIsSame(true);
    }
  }, 200);

  const goToEdit = () => {
    window.history.pushState({}, "", `/edit/${id}`);
    changeCurrentPath(`/edit/${id}`);
  };

  return (
    <List
      key={id}
      sx={{
        width: "50%",
        m: "auto",
        height: "100px",
        mt: "20px",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "text.primary",
        borderRadius: 5,
        boxShadow: 7,
      }}
    >
      <ListItem key="s" disableGutters>
        <ListItemAvatar>
          <Avatar
            alt="avatar"
            src={image}
            sx={{ m: "auto", ml: "10px", height: "90px", width: "100px" }}
          />
        </ListItemAvatar>
        <ListItemText sx={{ color: "black", ml: "40px" }}>{title}</ListItemText>
        {isSame
          ? [
              <Button
                onClick={goToEdit}
                sx={{ color: "primary.main", mr: "10px" }}
              >
                Edit
              </Button>,
              <Button
                sx={{ color: "primary.main", mr: "30px" }}
                onClick={deleteHandler}
              >
                Delete
              </Button>,
            ]
          : ""}
      </ListItem>
    </List>
  );
}

export default Item;
