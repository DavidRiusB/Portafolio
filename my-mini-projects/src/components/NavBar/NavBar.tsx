import React from "react";
import { Link } from "react-router-dom";

const NabBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to={"/TicTacToe"}>TicTacToe</Link>
      <Link to={"LogIn"}>LogIn</Link>
    </div>
  );
};
export default NabBar;
