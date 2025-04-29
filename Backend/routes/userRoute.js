import express from 'express'
import { createUser, getMyDetails, loginUser, logOut, sendOtp, topUpCredits, verifiOtp,} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();


userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/mydetails', auth, getMyDetails)
userRouter.get('/logout', logOut)
userRouter.post('/verify-email', auth, sendOtp)
userRouter.post('/verify-otp', auth, verifiOtp)
userRouter.post('/top-up', auth, topUpCredits)




export default userRouter;