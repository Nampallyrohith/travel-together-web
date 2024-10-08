import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterAs from "./components/RegisterAs";

function App() {
  return (
    <Routes>
      <Route path="/sign-user" element={<RegisterAs />} />
    </Routes>
  );
}

export default App;
