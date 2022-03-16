import "./App.css";
import Footer from "./components/Footer/Footer";
import ButtonAppBar from "./components/Nav/Nav";
import EachCard from "./components/Catalog/Card/Card";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateForm from "./components/CreateForm/CreateForm";
import Catalog from "./components/Catalog/Catalog";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <EachCard />
      {/* <Catalog /> */}
      <Login />
      <Register />
      <CreateForm />
      <Footer />
    </div>
  );
}

export default App;
