const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body, { abortEarly: false });
    if (result.error) {
      let messs = result.error.details;

      let message = Array.from(messs.map((e) => e.message));
      throw new ExpressError(404, message);
    }

    next();
}

module.exports.postReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);
    await review.save();
    await listing.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}