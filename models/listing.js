const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const { cloudinary, storage } = require("../cloudconfig");


const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  description: {
    type: String,
  },
  image: {
    filename:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  category:{
    type:String,
    required:true
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    let filename = listing.image.filename;
    await cloudinary.uploader.destroy(filename);
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
