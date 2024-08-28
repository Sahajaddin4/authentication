//import
const jwt = require("jsonwebtoken");
require("dotenv").config();

//middlewares for authentication
exports.auth = (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found!",
      });
    }

    //

    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);

      //req ke body mein role ko bhejo
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token invalid!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in middlewares",
    });
  }
};

//Student authentication
exports.isStudent = (req, res, next) => {
  try {
    const { role } = req.user.role;

    if (role != "Student") {
      return res.status(401).json({
        success: false,
        message: "Protected for students!",
      });
    }

    //else if role===student
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in student middlewares",
    });
  }
};

// Admin Middleware
exports.isAdmin = (req, res, next) => {
  try {
    const {role} = req.user;
    if (role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protect for Admin",
      });
    }

    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "error in Admin middlewares",
    });
  }
};
