import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ==========================================
// Register User
// ==========================================

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // Normalize input
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Login User
// ==========================================

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400);
      throw new Error(
        "Email and password are required"
      );
    }

    // Normalize email
    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    // Successful login
    res.status(200).json({
      success: true,

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};