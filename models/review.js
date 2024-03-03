const mongoose = require("mongoose");

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
// main()
//     .then(() => {
//         console.log("connection successfull");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const reviewSchema = new mongoose.Schema({
     rating:{
        type:Number,
        min:1,
        max:5,
        required:true
     },
     comment:{
        type:String,
        required:true
     },
     created_at:{
        type:Date,
        default:Date.now()
     },
     author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
     }
});

const Review = mongoose.model('Review',reviewSchema);

// const intitDb = async () => {
//    await Review.deleteMany({});
//    await Review.insertMany({rating:5,comment:"hii"});
//    console.log("data was intilized")
// }
// intitDb()

module.exports = Review;



