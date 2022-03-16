import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import Button from "@mui/material/Button";
import { Avatar, ListItemAvatar } from "@mui/material";

function UserItem({ id, email, image }) {
  const deleteHandler = (e) => {
    const userId = e.currentTarget.parentElement.parentNode.id;
    console.log(userId);
    fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
    });
  };

  return (
    <List
      id={id}
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
        <ListItemText sx={{ color: "black", ml: "40px" }}>{email}</ListItemText>
        <Button sx={{ color: "primary.main", mr: "10px" }}>Edit</Button>
        <Button
          sx={{ color: "primary.main", mr: "30px" }}
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </ListItem>
    </List>
  );
}

export default UserItem;
