import "./auth.css";

import { FaEnvelope, FaLock, FaEye, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase.js";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // =====================================================
  // IF ALREADY LOGGED IN, DON'T SHOW AUTH PAGE
  // =====================================================
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // =====================================================
  // SAVE LOGIN INFORMATION
  // =====================================================
  const saveLogin = (user) => {
    localStorage.setItem("isLoggedIn", "true");

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  // =====================================================
  // EMAIL SIGN UP
  // =====================================================
  const handleEmailSignup = async () => {
    if (!username || !displayName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          displayName,
          email,
          password,
        }),
      });

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      // Save login state
      saveLogin(data.user);
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      // Reload so Navbar reads new login state
      window.location.reload();
    } catch (error) {
      console.error("Signup error:", error);

      setError(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }
      saveLogin(data.user);
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const response = await fetch(`${API_URL}/api/auth/firebase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idToken,
        }),
      });

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Google login failed.");
      }
      saveLogin(data.user);
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      window.location.reload();
    } catch (error) {
      console.error("Google login error:", error);

      setError(error.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };
  const switchToSignUp = () => {
    setIsSignUp(true);
    setError("");
    setPassword("");
  };
  const switchToSignIn = () => {
    setIsSignUp(false);
    setError("");
    setPassword("");
  };

  return (
    <div className="auth">
      <div className="Upper_heading">
        <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>

        <h5 className={isSignUp ? "signup-subtitle" : "signin-subtitle"}>
          {isSignUp
            ? "Create your ReShelf.bd account"
            : "Sign in to your ReShelf.bd account"}
        </h5>
      </div>

      <div className="auth_page">
        <div className="Big_box">
          {isSignUp && (
            <>
              <div className="heading1">
                <h5>Username</h5>
              </div>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="heading2">
                <h5>Display Name</h5>
              </div>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="text"
                  placeholder="Enter display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </>
          )}
          <div className={isSignUp ? "heading2" : "heading1"}>
            <h5>Email</h5>
          </div>

          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="heading2">
            <h5>Password</h5>
          </div>

          <div className="input-wrapper">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FaEye
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {!isSignUp && <div className="forgot-password">Forgot password?</div>}
          {error && <p className="auth-error">{error}</p>}
          <div className="btn2">
            <button
              onClick={isSignUp ? handleEmailSignup : handleEmailLogin}
              disabled={loading}
            >
              {loading
                ? isSignUp
                  ? "Creating Account..."
                  : "Signing In..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </div>
          <div className="heading3">
            <h6>────────────── or continue with ──────────────</h6>
          </div>
          <div className="btn3">
            <button onClick={handleGoogleLogin} disabled={loading}>
              <FcGoogle className="social-icon" />

              <span>
                {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
              </span>
            </button>
          </div>
          <div className="heading4">
            {isSignUp ? (
              <>
                <span className="switch-text">Already have an account?</span>

                <span className="switch-link" onClick={switchToSignIn}>
                  Sign In
                </span>
              </>
            ) : (
              <>
                <span className="switch-text">Don't have an account?</span>

                <span className="switch-link" onClick={switchToSignUp}>
                  Sign Up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
