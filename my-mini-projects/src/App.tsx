import TicTacToe from "./components/TicTacToe/TicTacToe";
import PasswordChecker from "./components/LogIn/PasswordChecker";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import NabBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <NabBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticTacToe" element={<TicTacToe />} />
        <Route path="/LogIn" element={<PasswordChecker />} />
      </Routes>
    </>
  );
}

export default App;
