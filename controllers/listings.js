const Listing = require("../models/listing.js");
module.exports.index = async (req, res, next) => {
    let listings = await Listing.find({});
    let title = "NoWhere | Listing";
    res.render("listings/index.ejs", { listings, title });
}

module.exports.newListing = (req, res) => {
    const title = "NoWhere | New listing";
    res.render("listings/new.ejs", { title });
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.find({ _id: id }).populate({ path: "reviews", populate: { path: "author", } });
    const listItem = listings[0];

    if (!listItem) {
        req.flash("failure", "Listing not found!");
        res.redirect("/listings");
    }
    let title = `NoWhere | ${listItem.title}`;
    res.render("listings/show.ejs", { listItem, title });
}

module.exports.postNewListing = async (req, res, next) => {
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image.url = req.file.path;
    listing.image.filename = req.file.filename;
    await listing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listings = await Listing.find({ _id: id });
    const listItem =listings[0];
    if (!listItem) {
        req.flash("failure", "Listing not found!");
        res.redirect("/listings");
    }
    let originalUrl = listItem.image.url;
    let newUrl =  originalUrl.replace("/upload","/upload/h_200,w_250");
    let title = `NoWhere | Edit listing ${listItem.title}`;
    res.render("listings/edit.ejs", { listItem, title,newUrl });
}

module.exports.putEditListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        listing.image.url = req.file.path;
        listing.image.filename = req.file.filename;
        await listing.save();
    }

    req.flash("success", "Listing had been Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing has been deleted");

    res.redirect("/listings");
}
