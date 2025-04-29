import bcrypt from "bcrypt";
import sendCookie, { sendEmail } from "../utils/features.js";
import ErrorHandler from "../utils/error.js";
import User from "../modals/userModal.js";


// Function for creating User..

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, country } = req.body;

  
    if (!name || !email || !password || !country)
      return next(new ErrorHandler("All fields are required.", 400));

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new ErrorHandler("Invalid email format.", 400));
    }

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("Email already exists!", 409));

    const hashpassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      country,
      password: hashpassword,
      emailVerified: false,
      otp: "",
      otpExpiresAt: "",
    });

    sendCookie(user, res, "Registered successfully!", 201);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


// User Login function..

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("All fields are required!", 404));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, "Logged In Successfully!", 200);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// LogOut Function...

export const logOut = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Sucessfully!",
  });
};

// To Get my Details...

export const getMyDetails = (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "User Fetched Successfully!",
    user: req.user,
  });
};

// To Send otp for Email Verification....

export const sendOtp = async (req, res, next) => {
  const {email} =  req.user
  try {
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Email does not exits", 404));

    const OneTimePassword = Math.floor(1000 + Math.random() * 9000);

    const OtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = OneTimePassword;
    user.otpExpiresAt = OtpExpiry;

    user.save();

    res.status(200).json({
      status: true,
      message: "Otp has been sent to your Email",
    });

    sendEmail(OneTimePassword, email);
    console.log(OneTimePassword);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


// To Verify Otp...
export const verifiOtp = async (req, res,next) => {
  const { OneTimePassword} = req.body;

  const { id } = req.user;

  if (!OneTimePassword) return next(new ErrorHandler("Otp is required!", 404));

  try {
    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("User does not exist! ", 404));


    if(user.otp !== OneTimePassword)  return next(new ErrorHandler("Wrong Otp entered! ", 404));


    if (user.otp === OneTimePassword && user.otpExpiresAt > Date.now()) {

      user.emailVerified = true;
     
      user.otp = "";
      user.otpExpiresAt = null;

      user.save();

      res.status(200).json({
        status: true,
        message: "Email Verified successfully",
      });
    } else {
      res.json({
        status: false,
        message: "otp expired!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
};

// For Topup the credits

export const topUpCredits = async (req, res, next) => {
  const { credits } = req.body;

     if(credits < 4) return next(new ErrorHandler("Minimum TopUp credit value is 4 ", 404))

  if (!credits) return next(new ErrorHandler("Credits are required!", 404));

  try {
    const user = await User.findById(req.user._id);

    if (!user) return next(new ErrorHandler("User does not exist!", 404));

    user.credits += credits;

    await user.save();

    res.status(200).json({
      status: true,
      message: "Credits Added Successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
