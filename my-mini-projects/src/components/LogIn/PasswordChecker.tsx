import React, { useEffect, useState } from "react";
import "./PasswordChecker.css";

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pupilPosition, setPupilPosition] = useState({ right: 0, top: 0 });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const clearPassword = () => {
    setPassword("");
    setConfirmPassword("");
    setPupilPosition({ right: 0, top: 0 });
  };

  const imageSource = {
    bodyBack: "/Img/Login/octoBaseBack.png",
    bodyFront: "/Img/Login/octoBaseFront.png",
    eyes: "/Img/Login/defaultEyes.png",
    eyeBrown: "/Img/Login/eyeBrown.png",
    pupile: "/Img/Login/pupil.png",
    mouthHappy: "/Img/Login/mouth-happy.png",
    mouthSad: "/Img/Login/mouth-sad.png",
    mouthSurprised: "/Img/Login/mouth-surprised.png",
  };

  const getTentacleCoverImage = () => {
    if (confirmPassword.length > 0 && !showPassword)
      return "tentacle-state-cover";
    if (confirmPassword.length > 0 && showPassword)
      return "tentacle-state-half-cover";
    return "";
  };

  useEffect(() => {
    const maxLength = 20;
    const maxOffset = 5;
    const init = { right: 3.5, top: 4 };

    // Default position when no password
    if (password.length === 0) {
      setPupilPosition({ right: 0, top: 0 });
      return;
    }

    // Calculate how far the pupil moves
    const length = Math.min(password.length, maxLength);
    const rightOffset = init.right - (length / maxLength) * maxOffset;

    // Update pupil position
    setPupilPosition({ right: rightOffset, top: init.top });
  }, [password]);

  const getStregth = (password: string) => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    if (password.length >= 8) strength += 1;
    console.log(strength);

    if (strength === 0) return "strong";
    if (strength <= 2) return "weak";
    else if (strength <= 4) return "medium";
    else return "strong";
  };

  return (
    <div className="layout">
      <div className="character">
        <img src={imageSource.bodyBack} alt="Octopus Background" />

        {/* Eyes and mouth */}

        {/*eye base */}
        <div className="eyes">
          <img src={imageSource.eyes} alt="Eyes" />
        </div>

        <div className="pupil">
          <img
            src={imageSource.pupile}
            style={{
              right: `${pupilPosition.right}px`,
              top: `${pupilPosition.top}px`,
            }}
            alt="pupil"
          />
        </div>
        <div className="eyes">
          <div
            className={`eyes-browns eyes-browns-left-${getStregth(password)}`}
          ></div>
          <div
            className={`eyes-browns eyes-browns-right-${getStregth(password)}`}
          ></div>
          <div className="mouth">
            {getStregth(password) === "weak" ? (
              <img src={imageSource.mouthSad} />
            ) : getStregth(password) === "medium" ? (
              <img src={imageSource.mouthSurprised} />
            ) : (
              <img src={imageSource.mouthHappy} />
            )}
          </div>
        </div>

        {/* Tentacles */}
        <div
          className={`tentacle tentacle-left ${getTentacleCoverImage()}-left`}
        ></div>
        <div
          className={`tentacle tentacle-right ${getTentacleCoverImage()}-right`}
        ></div>

        <img src={imageSource.bodyFront} alt="Octopuss Logo" />
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
