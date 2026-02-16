const { default: string } = require("figlet/fonts/babyface-lame");
const { ref } = require("joi");
const mongoose= require("mongoose");
const Review= require("./review.js");
const User= require("./user.js");



const schema= mongoose.Schema;

const listingSchema= new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: String,
        url: String
    },
    price: {
        type: Number,
    },
    
    location: String,
    country: String,
    reviews: [{
        type: schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: [{
        type: schema.Types.ObjectId,
        ref: "User"
    }],
     geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      
    },
    coordinates: {
      type: [Number],
      
    }
  },
   category: {
    type: String,
    enum: ["Mountain-City", "Yurts", "swimming-pool", "iconic-City", "Hotels", "Snow-Cave", "snow-City", "camping", "Adventure"]
   }
})


listingSchema.post("findOneAndDelete", async (listing) => {
   if (listing) {
    let res=await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log("Deleted reviews:", res);
   }
});
const Listing= mongoose.model("Listing", listingSchema);

// Move this inside your Mongoose Listing Schema file (models/schema.js)
// Apply it to the MONGOOSE schema variable, not the Joi schema


module.exports= Listing;