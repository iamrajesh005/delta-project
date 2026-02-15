const express= require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync= require("../utills/asyncwrap.js");
const {listingSchema, reviewSchema}= require("../schemaVal.js");
const Review= require("../models/review.js");
const Listing= require("../models/schema.js");
const expressError= require("../utills/expresserror.js");
const {isLoggedIn, isAuthor}= require("../middleware.js");
const reviewController= require("../controller/review.js");


const validateReview= (req, res, next)=>{
    const {error}= reviewSchema.validate(req.body.Review);
    if(error){
        let msg= error.details.map(el=> el.message).join(",");
        throw new expressError(msg, 400);
    }else{
        next();
    }
}


router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// app.delete("/listings/:id/reviews", wrapAsync(async(req, res)=>{
//     let {id}= req.params;
//     let listing= await Listing.findById(id);
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//     res.redirect(`/listings/${id}`);
// }))

router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview ));

module.exports= router;