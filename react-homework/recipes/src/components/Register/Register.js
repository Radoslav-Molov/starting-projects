import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [validInputs, setValidInputs] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const pictureChangeHandler = (event) => {
    setPicture(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const submissionHandler = (event) => {
    event.preventDefault();

    if (
      email.length < 15 &&
      password.length > 8 &&
      picture !== "" &&
      description.length < 512
    ) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
      return;
    }

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        picture,
        description,
        gender: gender,
        status: "Active",
        dateOfRegistration: Date().toLocaleString(),
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));

    setEmail("");
    setPassword("");
    setPicture("");
    setDescription("");
  };
  return (
    <form onSubmit={submissionHandler}>
      <Grid sx={{ maxWidth: "30%", m: "auto" }}>
        <Paper elevation={10}>
          <Grid align="center">
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            onChange={emailChangeHandler}
            sx={{ m: 2, width: "70%" }}
            label="Email"
            placeholder="Enter email"
            value={email}
            fullWidth
            required
          />
          <TextField
            onChange={passwordChangeHandler}
            sx={{ m: 2, width: "70%" }}
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            fullWidth
            required
          />
          <TextField
            onChange={pictureChangeHandler}
            sx={{ m: 2, width: "70%" }}
            label="Picture"
            placeholder="Enter picture url"
            type="url"
            value={picture}
            fullWidth
            required
          />
          <TextField
            onChange={descriptionChangeHandler}
            sx={{ m: 2, width: "70%" }}
            label="Description"
            placeholder="Enter short info"
            type="description"
            value={description}
            fullWidth
            required
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                onChange={genderChangeHandler}
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                onChange={genderChangeHandler}
                value="male"
                control={<Radio />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>
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
            Sign in
          </Button>

          <Typography>
            {" "}
            Do you have an account ?<Link href="#">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
}

export default Register;
