// import jwt from "jsonwebtoken";

// export const auth = async (req, res, next) => {
//   console.log("Auth middleware hit");
//   try {
//     let token = req.headers.authorization;
//     console.log("Token received:", token);

//     if (token) {
//       token = token.split(" ")[1];
//       console.log("Token after split:", token);
//       let decode = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decode);
//       req.userId = decode?.id;
//     }

//     if (!req.userId) {
//       console.log("No userId found in token.");
//       return res.status(401).json({ message: "Unauthenticated" });
//     }

//     next();
//   } catch (error) {
//     console.log("Error in auth middleware:", error);
//     res.status(401).json({ message: "Unauthenticated" });
//   }
// };

// import jwt from "jsonwebtoken";

// export const auth = async (req, res, next) => {
//   console.log("Auth middleware hit");
//   try {
//     const token = req.cookies.token; // Read the token from cookies
//     console.log("Token received from cookies:", token);

//     if (token) {
//       let decode = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decode);
//       req.userId = decode?.id;
//     }

//     if (!req.userId) {
//       console.log("No userId found in token.");
//       return res.status(401).json({ message: "Unauthenticated" });
//     }

//     next();
//   } catch (error) {
//     console.log("Error in auth middleware:", error);
//     res.status(401).json({ message: "Unauthenticated" });
//   }
// };
// import jwt from "jsonwebtoken";

// export const auth = async (req, res, next) => {
//   console.log("Auth middleware hit");
//   try {
//     const token = req.cookies?.token; // Use optional chaining to prevent errors if req.cookies is undefined
//     console.log("Token received from cookies:", token);

//     if (token) {
//       let decode = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decode);
//       req.userId = decode?.id;
//     }

//     if (!req.userId) {
//       console.log("No userId found in token.");
//       return res.status(401).json({ message: "Unauthenticated" });
//     }

//     next();
//   } catch (error) {
//     console.log("Error in auth middleware:", error);
//     res.status(401).json({ message: "Unauthenticated" });
//   }
// };
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  console.log("Auth middleware hit");
  try {
    const token = req.cookies?.token; // Use optional chaining to prevent errors if req.cookies is undefined
    console.log("Token received from cookies:", token);

    if (token) {
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decode);
      req.userId = decode?.id;
    }

    if (!req.userId) {
      console.log("No userId found in token.");
      return res.status(401).json({ message: "Unauthenticated" });
    }

    next();
  } catch (error) {
    console.log("Error in auth middleware:", error);
    res.status(401).json({ message: "Unauthenticated" });
  }
};

