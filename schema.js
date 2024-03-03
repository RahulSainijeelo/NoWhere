const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(150).required(),
        image: Joi.object({ 
            filename:Joi.string().required(),
            url:Joi.string().required(),
        }).required(),
        price: Joi.number().min(0).max(1000000000).required(),
        location: Joi.string().min(3).max(50).required(),
        country: Joi.string().min(3).max(20).required(),
        category: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().min(3).max(1000).required(),
    }).required()
})