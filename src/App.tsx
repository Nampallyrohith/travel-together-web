import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterAs from "./components/RegisterAs";
import Container from "./components/Container";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/sign-user" element={<RegisterAs />} />
      <Route path="/" element={<Container />}>
        <Route path="/places" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
