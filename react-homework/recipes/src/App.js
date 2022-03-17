import "./App.css";
import { useState, useEffect } from "react";
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
  const [user, setUser] = useState("");

  const changeCurrentPath = (currentPath) => {
    setPath(currentPath);
  };
  useEffect(() => {
    if (!window.localStorage) {
      setUser("");
    } else {
      const userKey = Object.keys(window.localStorage);
      setUser(userKey[0]);
    }
  }, []);

  // console.log(user);
  if (path === "/login") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <Login />
        <Footer />
      </div>
    );
  }
  if (path === "/register") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <Register />
        <Footer />
      </div>
    );
  }
  if (path === "/recipes") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <Catalog />
        <Footer />
      </div>
    );
  }
  if (path === "/create") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <CreateForm />
        <Footer />
      </div>
    );
  }
  if (path === "/users") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <Users />
        <Footer />
      </div>
    );
  }
  if (path === "/list") {
    return (
      <div className="App">
        <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
        <List />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <ButtonAppBar user={user} changeCurrentPath={changeCurrentPath} />
      <Catalog />
      <Footer />
    </div>
  );
}

export default App;
