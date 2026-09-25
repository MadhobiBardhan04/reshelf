import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminAuth from "../firebaseAdmin.js";

// authController.js
const createTokenCookie = (res, userId, role) => {
  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    const { username, displayName, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      displayName,
      email,
      password: hashedPassword,
      provider: "email",
    });

    createTokenCookie(res, user._id, user.role);

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        provider: user.provider,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Signup failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        message: "Please use your original sign-in method",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    createTokenCookie(res, user._id, user.role);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        provider: user.provider,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "Firebase ID token is required",
      });
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email || null;
    const displayName = decodedToken.name || "";
    const photoURL = decodedToken.picture || "";

    if (!firebaseUid) {
      return res.status(401).json({
        message: "Invalid Firebase user",
      });
    }

    let user = await User.findOne({
      $or: [{ firebaseUid }, ...(email ? [{ email }] : [])],
    });

    if (!user) {
      user = await User.create({
        firebaseUid,
        email,
        displayName,
        photoURL,
        provider: "google",
      });
    } else {
      let changed = false;

      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        changed = true;
      }

      if (displayName && !user.displayName) {
        user.displayName = displayName;
        changed = true;
      }

      if (photoURL && !user.photoURL) {
        user.photoURL = photoURL;
        changed = true;
      }

      if (!user.provider) {
        user.provider = "google";
        changed = true;
      }

      if (changed) {
        await user.save();
      }
    }

    createTokenCookie(res, user._id, user.role);

    return res.status(200).json({
      message: "Google authentication successful",
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: user.provider,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Firebase authentication error:", error);

    return res.status(401).json({
      message: error.message || "Firebase authentication failed",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};
