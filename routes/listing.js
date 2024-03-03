const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const {isLoggedIn, isOwner,validateSchema} = require("../authenticate.js");
const multer  = require('multer')
const{cloudinary,storage} = require("../cloudconfig.js");
const upload = multer({storage});

//Index Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateSchema,wrapAsync(listingController.postNewListing));
  //  .post( upload.single('listing[image]'),(req,res)=>{
  //    console.log(req.body.listing.title);
  //  })
  
//New Route
router
 .route("/new")
 .get(isLoggedIn,listingController.newListing );
  
//id Route
router
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateSchema,wrapAsync(listingController.putEditListing))
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));
//id/edit Route
router.get(
 "/:id/edit",isLoggedIn,isOwner,
 wrapAsync(listingController.editListing)
);

module.exports = router;