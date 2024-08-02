// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const login = (req, res) => {
//   const { email, password } = req.body;

//   console.log("Incoming email:", email);
//   console.log("Incoming password:", password);
//   console.log("Env email:", process.env.ADMIN_EMAIL);
//   console.log("Env password:", process.env.ADMIN_PASSWORD);

//   if (
//     email === process.env.ADMIN_EMAIL &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res) => {
  const { email, password } = req.body;

  if (
    email == process.env.ADMIN_EMAIL &&
    password == process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
      maxAge: 3600000, // Cookie expiry time in milliseconds (1 hour)
    });

    // Respond with a success message
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

