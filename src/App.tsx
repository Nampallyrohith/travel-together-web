import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUser from "./components/SignUser";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignUser />} />
    </Routes>
  );
}

export default App;
