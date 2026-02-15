const Listing= require("../models/schema.js");
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index= async(req, res)=>{ 
    let getListing= await Listing.find({});
    res.render("index.ejs", {getListing,currUser: req.user});
}

module.exports.renderNew= (req, res)=>{
    res.render("new.ejs", {currUser: req.user});
}

module.exports.renderShowpage= async (req, res)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id).populate({path: "reviews",
        populate:{
            path: "author",  //nested populate
        }
    }).populate("owner");
    
   if(!listing){
     req.flash("error", "listing does not exist");
     return res.redirect("/listings");
   }
    res.render("show.ejs", {listing, currUser: req.user});
}

module.exports.saveNewListing= async (req, res) => {
   let response= await geocodingClient.forwardGeocode({
    query: req.body.location,
    limit: 1
    })
    .send()

    let url= req.file.path;
    let filename= req.file.filename;
    let newList = new Listing(req.body);
    newList.owner= req.user._id;
    newList.image= {url, filename};
    newList.geometry= response.body.features[0].geometry;
    
    let list= await newList.save().then((res)=>{
        console.log(res);
     }) // wrapAsync will catch any error here and pass it to next()
     console.log(list);
    req.flash("success", "new listing created successfully");
    res.redirect("/listings");
}

module.exports.filterListings= async (req, res)=>{
   let {id}= req.params;
   let listing= await Listing.find({category: id});
   if(listing && listing.length>0){
     res.render("filter.ejs", {listing, id});
   } else{
     res.render("empty.ejs", {id,currUser: req.user});
   }
}

module.exports.searchListing= async(req, res)=>{
    let {country}= req.query;
    let getListing= await Listing.find({
         country: { $regex: country, $options: "i" }
    }
       
    )
    if(getListing && getListing.length>0){
       res.render("search.ejs", {getListing, currUser: req.user, country});
    } else{
        req.flash("error", "No such listing exist till now , Try another country");
        res.redirect("/listings");

    }
    
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    // let img= listing.image.url;
    // img.replace("/upload", '/upload/w_500,h_350,c_fill');
    res.render("edit.ejs", { listing,currUser: req.user });
};

module.exports.profileVisit= async (req, res)=>{
   
    res.render("profile.ejs", {currUser: req.user});
}

 module.exports.updateListing= async (req, res)=>{
     let {id}= req.params;
    let listing= await Listing.findByIdAndUpdate(id, req.body,{runValidators:true , new: true});
    if(typeof req.file != "underfined"){
        let url= req.file.path;
        let filename= req.file.filename;
         listing.image= {url, filename};
         await listing.save();
    }
     
     req.flash("success", "listing updated successfully");
     res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};