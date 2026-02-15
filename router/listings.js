const express= require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync= require("../utills/asyncwrap.js");

const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
// const {index}= require("../controller/listing.js");  wrapasync(index)
const listingController= require("../controller/listing.js"); //another way to import
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage});


router.route("/")
.get( wrapAsync(listingController.index)) //here you can write only index if we directly import index as written above
.post( isLoggedIn, upload.single('image'),validateListing ,
  listingController.saveNewListing
);



router.get("/new",isLoggedIn,listingController.renderNew );
router.get("/search", listingController.searchListing);


router.get("/filter/:id", listingController.filterListings);
router.get("/user",isLoggedIn, listingController.profileVisit);


router.route("/:id").get( wrapAsync(listingController.renderShowpage))
.patch(isLoggedIn,isOwner,upload.single('image'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

 

 

 module.exports= router;
