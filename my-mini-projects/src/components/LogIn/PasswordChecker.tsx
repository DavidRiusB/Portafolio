import React, { useState } from "react";
import "./PasswordChecker.css";

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearPassword = () => {
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="layout">
      <div className="character">
        {/* Character can be added here for animation */}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Enter Your Password</h3>
        <div className="input-group">
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <h3>Confirm Your Password</h3>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </form>
      <div className="button-group">
        <button onClick={togglePasswordVisibility} className="btn">
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <button onClick={clearPassword} className="btn clear-btn">
          Clear Password
        </button>
      </div>
    </div>
  );
};

export default PasswordChecker;
