// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const login = (req, res) => {
//   const { email, password } = req.body;

//   if (
//     email == process.env.ADMIN_EMAIL &&
//     password == process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Set the token in an HTTP-only cookie
//     res.cookie('token', token, {
//       httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//       secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
//       maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
//     });

//     // Respond with a success message
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists in the database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Email is incorrect" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
      maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
    });

    // Respond with a success message
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateAdmin = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the first admin in the database
    const admin = await Admin.findOne();
    
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Update email if provided
    if (email) {
      admin.email = email;
    }

    // Update password if provided
    if (newPassword) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    // Save the updated admin information
    await admin.save();

    // Respond with a success message
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};