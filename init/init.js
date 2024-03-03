const Listing = require("../models/listing.js");
const mongoose = require('mongoose');
const data = require('./data.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log(err);
    });

const intitDb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("data was intilized")
}
intitDb()