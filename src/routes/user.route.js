import { Router } from "express";
import userSignup from "../controllers/signup/signup.controller.js";
import login from "../controllers/login/login.controller.js";
import logout from "../controllers/logout/logout.controller.js";
import { verifyEmail } from "../controllers/verifyemail/verifyemail.controller.js";
import allusers from "../controllers/allusers/allusers.controllers.js";
import setcookies from "../controllers/setcookies.js";
import checkcookies from "../controllers/checkcookies.js";
import userinfo from "../controllers/userinfo.controllers.js";

const router = Router();

router.route("/signup").post(userSignup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verifyemail").post(verifyEmail);
router.route("/allusers").get(allusers);
router.route("/setcookies").post(setcookies);
router.route("/checkcookie").post(checkcookies);
router.route("/userinfo").post(userinfo);


export default router;
