import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";
import User from "../modals/userModal.js";

// Function For User Authentication...

export const auth = async (req, res, next) => {

  try {
    
    const { token } = req.cookies;

    if (!token)

      return next(new ErrorHandler('Login First..',404))

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.token);

    next();

  } catch (error) {
    next(error)
  
  }
};
