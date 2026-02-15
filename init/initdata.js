const express= require("express");
const app= express();
const initData= require("./data.js");
const mongoose= require("mongoose");

const User= require("../models/user.js");
const Listing = require("../models/schema.js");

const MONGO_LINK='mongodb://127.0.0.1:27017/wonderlist';
main()
.then(()=>{
    console.log("connected to mongodb");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_LINK);
}


const initDb= async()=>{
    await Listing.deleteMany({});
    console.log("done");

}


initDb();