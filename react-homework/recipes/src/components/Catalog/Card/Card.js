import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function EachCard({
  id,
  title,
  summary,
  prepTime,
  ingredients,
  image,
  fullDescription,
  tags,
  dateCreated,
}) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader title={title} subheader={dateCreated} />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Final product"
      />
      <CardContent>
        <div style={{ display: "flexbox", flexWrap: "wrap" }}>
          <Box
            sx={{ maxWidth: "400px", wordWrap: "break-word" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>Summary:</strong>
            {summary}
          </Box>
          <Typography
            sx={{ maxWidth: "400px", wordWrap: "break-word" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>Preparation time:</strong>
            {prepTime}
          </Typography>
          <Typography
            sx={{ maxWidth: "400px", wordWrap: "break-word" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>Ingredients:</strong>
            {ingredients}
          </Typography>
          <Typography
            whiteSpace="normal"
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: "400px", wordWrap: "break-word" }}
          >
            <strong>Description:</strong>
            {fullDescription}
          </Typography>
          <Typography
            sx={{ maxWidth: "400px", wordWrap: "break-word" }}
            variant="body2"
            color="text.secondary"
          >
            <strong>Tags:</strong>
            {tags}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default EachCard;
