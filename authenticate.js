const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const{cloudinary,storage} = require("./cloudconfig.js");
const wrapAsync = require("./utils/wrapAsync.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // req.session.redirectUrl = req.originalUrl;
        req.flash("failure","You must be Logged in ");
        return res.redirect("/listings");
    };
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(listing && !listing.owner.equals(res.locals.currUser._id)){
        req.flash("failure","You are not the owner of this Listing");
        return res.redirect(`/listings/${id}`);
    };
    next();
};


module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params
    let review = await Review.findById(reviewId);
    if(review && !review.author.equals(res.locals.currUser._id)){
       req.flash("failure","You are not the author of this Review");
       return res.redirect(`/listings/${id}`)
    };
    next();
};

module.exports.validateSchema = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = JSON.stringify(req.body.listing);
        listing = JSON.parse(listing);
        let OldListing = await Listing.findById(id);
        let image = {
            filename:"hello",
            url:"hello"
        };
        listing.image = image;
    if (req.method == "PUT") {
        if (!req.file) {
            listing.image.filename = OldListing.image.filename;
            listing.image.url = OldListing.image.url;
            req.body.listing = listing;
            const result = listingSchema.validate(req.body, { abortEarly: false });
            if (result.error) {
                let messs = result.error.details;
                let message = Array.from(messs.map((e) => e.message));
                next(new ExpressError(404, message));
            };

            next();
        } else {
            listing.image.filename = req.file.filename;
            listing.image.url = req.file.path;
            req.body.listing = listing;
            const result = listingSchema.validate(req.body, { abortEarly: false });
            
            if (result.error) {
                let filename = req.file.filename;
                let messs = result.error.details;
                let message = Array.from(messs.map((e) => e.message));
                await cloudinary.uploader.destroy(filename);
                next(new ExpressError(404, message));
            }else{
                await cloudinary.uploader.destroy(OldListing.image.filename);
                next();
            }
        };
    }else{
        if(req.file){
            listing.image.filename = req.file.filename;
            listing.image.url = req.file.path;
            req.body.listing = listing;
            const result = listingSchema.validate(req.body, { abortEarly: false });
            if (result.error) {
                    let filename = req.file.filename;
                    let messs = result.error.details;
                    let message = Array.from(messs.map((e) => e.message));
                    await cloudinary.uploader.destroy(filename);
                    next(new ExpressError(404, message));
                };
            next();
        }else{
            const result = listingSchema.validate(req.body, { abortEarly: false });
            if (result.error) {
                    let messs = result.error.details;
                    let message = Array.from(messs.map((e) => e.message));
                    next(new ExpressError(404, message));
                };
            next();
        } 
    };
});

// module.exports.updateDocument = wrapAsync(async (req, res, next) => {
//     if (req.file) {
//         let listing = JSON.stringify(req.body.listing);
//         listing = JSON.parse(listing);
//         listing.image.filename = req.file.filename;
//         listing.image.url = req.file.path;
//         req.body.listing = listing;
//         next();
//     };
//     next();
// })




// module.exports.savedUrl = (req,res,next)=>{
//     if(req.session.redirectUrl){
//         console.log(req.session.redirectUrl);
//         res.locals.redirectUrl = req.session.redirectUrl;
//         console.log(res.locals.redirectUrl);
//         next();
//     }else{
//         next();
//     }
    
// }