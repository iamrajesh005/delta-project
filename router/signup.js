const express= require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync= require("../utills/asyncwrap.js");
const passport= require("passport"); 

const {saveRedirectUrl}= require("../middleware.js");

const authenticatonController= require("../controller/signup.js");

router.route("/signup").get(authenticatonController.signUpPage)
.post( wrapAsync(authenticatonController.newUser))

router.route("/login").get(authenticatonController.renderLogin)
.post(saveRedirectUrl, passport.authenticate(
    "local",
    {  
        failureRedirect: "/login",
        failureFlash: true
    }
), authenticatonController.login)

router.get("/logout", authenticatonController.logout);

module.exports= router;