import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NabBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"LogIn"}>LogIn</Link>
      <Link to={"/TicTacToe"}>TicTacToe</Link>
    </div>
  );
};
export default NabBar;
