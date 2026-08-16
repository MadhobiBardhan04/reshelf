import "./auth.css";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [sentOtp, setSentOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let heading;
  let subtitle;

  if (isSignUp) {
    heading = "Create an Account";
    subtitle = "Create your ReShelf.bd account";
  } else {
    heading = "Welcome Back";
    subtitle = "Sign in to your Reself.bd account";
  }
  return (
    <div className="auth">
      <div className="Upper_heading">
        <h2> {heading} </h2>
        <h5 className={isSignUp ? "signup-subtitle" : "signin-subtitle"}>
          {subtitle}
        </h5>
      </div>
      <div className="Big_box">
        <div className="btn">
          <button
            onClick={() => {
              setLoginMethod("email");
              setSentOtp(false);
            }}
          >
            Email
          </button>
          <button
            onClick={() => {
              setLoginMethod("phone");
              setSentOtp(false);
            }}
          >
            Phone
          </button>
        </div>
        {loginMethod === "email" ? (
          <>
            <div className="heading1">
              <h5> Email </h5>
            </div>
            <div className="Type_email_address">
              <FaEnvelope className="Mail_icon" />
              <input type="text" placeholder="you@example.com" />
            </div>

            <div className="heading2">
              <h5> password </h5>
            </div>
            <div className="Type_password">
              <FaLock className="lock_icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="robin122#@cat"
              />
              <FaEye
                className="eye_icon"
                onClick={() => setShowPassword(!showPassword)}
              />
              <h6> Forgot password? </h6>
            </div>
            <div className="btn2">
              <button
                onClick={() => {
                  localStorage.setItem("isLoggedIn", "true");
                  navigate("/");
                  window.location.reload();
                }}
              >
                Sign In
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="heading1">
              <h5> Phone Number </h5>
            </div>
            <div className="Type_email_address">
              <FaPhone className="Mail_icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="+880 1XXXXXXXXX"
              />
            </div>
            <div className="heading2">
              <h5> OTP </h5>
            </div>
            <div className="Type_password">
              <FaLock className="lock_icon" />
              <input type="text" placeholder="123456" />
              <FaEye className="eye_icon" />
              <h6> Resend OTP </h6>
            </div>
            {sentOtp ? (
              <div className="btn2">
                <button
                  onClick={() => {
                    localStorage.setItem("isLoggedIn", "true");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="btn2">
                <button onClick={() => setSentOtp(true)}>Send OTP</button>
              </div>
            )}
          </>
        )}

        <div className="heading3">
          <h6> ──────────────── or continue with ──────────────── </h6>
        </div>
        <div className="btn3">
          <FcGoogle className="google_icon" />
          <button>Sign In with Google</button>
          <FaApple className="apple_icon" />
          <button>Sign In with Apple</button>
        </div>
        <div className="heading4">
          {isSignUp ? (
            <>
              <h6>Already have an account? </h6>
              <span onClick={() => setIsSignUp(false)}>Sign In</span>
            </>
          ) : (
            <>
              <h6>Don't have an account?</h6>
              <span onClick={() => setIsSignUp(true)}>Sign Up</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
