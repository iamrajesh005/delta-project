const Review= require("../models/review.js");
const Listing= require("../models/schema.js");

module.exports.postReview= async(req, res) => {
    let { id } = req.params;
    let { ratings, comment } = req.body;
    let listing = await Listing.findById(id);
    
    // Explicitly create the review from req.body fields
    let newReview = new Review({
        ratings: ratings,
        comment: comment
    });
    
    listing.reviews.push(newReview);
    newReview.author= req.user._id;
    await newReview.save().then((res)=>{
        console.log(res);
    });
    await listing.save();
    req.flash("success", "new review created successfully");
     // Check terminal now
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview= async(req, res)=>{
    let {id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log(await Listing.findById(id));
    req.flash("success", "review deleted successfully");
    res.redirect(`/listings/${id}`);
}