import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ButtonAppBar({ changeCurrentPath }) {
  const logoutHandler = () => {
    localStorage.removeItem("userToken");
  };

  const loginHandler = () => {
    window.history.pushState({}, "", "/login");
    changeCurrentPath("/login");
  };
  const registerHandler = () => {
    window.history.pushState({}, "", "/register");
    changeCurrentPath("/register");
  };
  const recipesHandler = () => {
    window.history.pushState({}, "", "/recipes");
    changeCurrentPath("/recipes");
  };
  const listHandler = () => {
    window.history.pushState({}, "", "/list");
    changeCurrentPath("/list");
  };
  const createHandler = () => {
    window.history.pushState({}, "", "/create");
    changeCurrentPath("/create");
  };
  const usersHandler = () => {
    window.history.pushState({}, "", "/users");
    changeCurrentPath("/users");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="grey" position="static">
        <Toolbar>
          <Button color="inherit" onClick={recipesHandler}>
            Recipes
          </Button>
          <Button color="inherit" onClick={listHandler}>
            List
          </Button>
          <Button color="inherit" onClick={createHandler}>
            Create recipe
          </Button>
          <Button color="inherit" onClick={usersHandler}>
            Users
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipes
          </Typography>
          <Button color="inherit" onClick={loginHandler}>
            Login
          </Button>
          <Button color="inherit" onClick={registerHandler}>
            Register
          </Button>
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar;
