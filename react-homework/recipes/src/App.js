import "./App.css";
import { useState, useCallback } from "react";
import Footer from "./components/Footer/Footer";
import ButtonAppBar from "./components/Nav/Nav";
import EachCard from "./components/Catalog/Card/Card";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateForm from "./components/CreateForm/CreateForm";
import Catalog from "./components/Catalog/Catalog";
import Item from "./components/List/ListItem/ListItem";
import List from "./components/List/List";
import Users from "./components/Users/Users";

function App() {
  const [path, setPath] = useState("");

  const changeCurrentPath = (currentPath) => {
    setPath(currentPath);
  };

  if (path === "/login") {
    return (
      <div className="App">
        <ButtonAppBar />
        <Login />
        <Footer />
      </div>
    );
  }
  if (path === "/register") {
    return (
      <div className="App">
        <ButtonAppBar />
        <Register />
        <Footer />
      </div>
    );
  }
  if (path === "/recipes") {
    return (
      <div className="App">
        <ButtonAppBar />
        <Catalog />
        <Footer />
      </div>
    );
  }
  if (path === "/create") {
    return (
      <div className="App">
        <ButtonAppBar />
        <CreateForm />
        <Footer />
      </div>
    );
  }
  if (path === "/users") {
    return (
      <div className="App">
        <ButtonAppBar />
        {/* <Users /> */}
        <Footer />
      </div>
    );
  }
  if (path === "/list") {
    return (
      <div className="App">
        <ButtonAppBar />
        <List />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <ButtonAppBar changeCurrentPath={changeCurrentPath} />

      {/* <Catalog /> */}
      <Users />
      <Footer />
    </div>
  );
}

export default App;
