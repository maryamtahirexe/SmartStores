import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, oldPassword,password } = req.body;

  try {
    
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(400).json({ message: "Email is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

<<<<<<< HEAD
// export const updateAdmin = async (req, res) => {
//   const { email, oldPassword, password } = req.body;

//   try {

//     const admin = await Admin.findOne();

//     if (!admin) {
//       return res.status(400).json({ message: "Admin not found" });
//     }

//     if (email) {
//       admin.email = email;
//     }

//     if (oldPassword) {
//       const isMatch = await bcrypt.compare(oldPassword, admin.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Old password is incorrect' });
//       }
//     }

//     if (password) {
//       const isAlreadyHashed = await bcrypt.compare(password, admin.password);
//       if (isAlreadyHashed) {
//         return res.status(400).json({ message: "New password cannot be the same as the old password" });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       admin.password = hashedPassword;
//     }

//     await admin.save();

//     res.status(200).json({ message: "Admin updated successfully" });
//   } catch (error) {
//     console.error("Error updating admin:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


=======
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
export const updateAdmin = async (req, res) => {
  const { email, oldPassword, password } = req.body;

  try {
    const admin = await Admin.findOne();
<<<<<<< HEAD

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

=======

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Update email if provided
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
    if (email) {
      admin.email = email;
    }

<<<<<<< HEAD
    // Ensure the old password is provided if the password is being updated
    if (password && !oldPassword) {
      return res.status(400).json({ message: "Old password is required to set a new password" });
    }

    if (oldPassword) {
      // Compare the old password with the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Ensure the new password is not the same as the old one
      if (oldPassword === password) {
        return res.status(400).json({ message: "New password cannot be the same as the old password" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the password
      admin.password = hashedPassword;
    }

    await admin.save();

=======
    // Update password if provided
    if (newPassword) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    // Save the updated admin information
    await admin.save();

    // Respond with a success message
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

<<<<<<< HEAD

=======
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
export const getOwner = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({
      email: admin.email,
      password: admin.password,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
