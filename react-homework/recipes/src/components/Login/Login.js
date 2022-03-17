import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
// import { Button, TextField } from "@mui/material";

function Login(onLoginHandler) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validInputs, setValidInputs] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submissionHandler = (event) => {
    event.preventDefault();

    if (email.length <= 15 && password.length > 8) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
      return;
    }

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        window.localStorage.setItem(email, data.accessToken);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submissionHandler}>
      <Grid sx={{ maxWidth: "30%", m: "auto" }}>
        <Paper elevation={10}>
          <Grid align="center">
            <h2>Sign In</h2>
          </Grid>
          <TextField
            sx={{ m: 2, width: "70%" }}
            onChange={emailChangeHandler}
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
          />
          <TextField
            sx={{ m: 2, width: "70%" }}
            onChange={passwordChangeHandler}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
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
            Sign in
          </Button>

          <Typography>
            {" "}
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
}
export default Login;
