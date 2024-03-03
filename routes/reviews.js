const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor } = require("../authenticate.js");
const reviewController = require("../controllers/reviews.js");

//post route
router.post(
  "/", isLoggedIn,
  reviewController.validateReview,
  wrapAsync(reviewController.postReview)
);

//destroy route
router.delete(
  "/:reviewId", isLoggedIn, isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;