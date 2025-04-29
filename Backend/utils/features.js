import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendCookie = (user, res, message, statusCode) => {
  
  const token = jwt.sign({ token: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1500 * 1000),
      httpOnly: true,
      sameSite:"none",
      secure:true
    })
    .json({
      success: true,
      message: message,
    });
};

export const sendEmail = async (Otp, Email) => {
  
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: Email,
    subject: "Verifcation Email",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .container { width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; }
        .logo { text-align: center; margin-bottom: 20px; }
        .heading { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
        .message { font-size: 16px; margin-bottom: 20px; }
        .otp { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
        .footer { text-align: center; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div className="container flex justify-center items-center ">
        <div class="logo">
            <h1>Task Manager</h1>
        </div>
        <div class="heading">OTP Verification</div>
        <div class="message">Please use the following OTP to complete your verification:</div>
        <div class="otp">${Otp}</div>
        <div class="message">This OTP is valid for the next 15 minutes.</div>
        <div class="footer">
            If you did not request this verification, please ignore this email.
        </div>
    </div>
</body>
</html>`,
  };

 await transporter.sendMail(mailOptions, (error, info) => {
   
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({
        status: true,
        message: "Email sent Successfuly!",
      });
    }
  });
};

export default sendCookie;
