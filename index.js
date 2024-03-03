if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const port = 8080;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const { isLoggedIn } = require("./authenticate.js");
const Listing = require("./models/listing.js");
const wrapAsync = require('./utils/wrapAsync.js');

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
}
);
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 5 * 24 * 60 * 60 * 1000,
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate((err) => {
  if (err) {
    next(new ExpressError(404, "something went wrong"))
  };

  next();
})));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port, () => {
  console.log(`app is listening to the port ${port}`);
});

app.use((req, res, next) => {
  // flash a message
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user;
  next();
})

app.use("/listings", listings);

app.use(async (err, req, res, next) => {
  if (req.method == "PUT" || req.method == "POST") {
    const {
      status = 500,
      message = "Something Went Wrong",
      title = "Error",
    } = err;
    await res.status(status).render("extras/Error.ejs", { title, message });
  } else {
    next(err);
  }
});

app.use("/", userRouter);
app.use("/listings/:id/review", reviews);
app.get('/allQueries', wrapAsync(async (req, res) => {
  const query = req.query.query.trim().toLowerCase();
  if (query != '') {
    let list = await Listing.find({
      $or: [
        { title: new RegExp('^' + query, 'i') },
        { location: new RegExp('^' + query, 'i') },
        { country: new RegExp('^' + query, 'i') },
        { description: new RegExp('^' + query, 'i') },
      ]
    });
    res.json(list);
  }

}));


app.get('/search', async (req, res) => {

  const query = req.query.query.trim().toLowerCase();
  if (query != "") {
    let listings = await Listing.find({
      $or: [
        { title: new RegExp('^' + query, 'i') },
        { location: new RegExp('^' + query, 'i') },
        { country: new RegExp('^' + query, 'i') },
        { description: new RegExp('^' + query, 'i') },
      ]
    });
    let title = `NoWhere | ${query}`;
    res.render("includes/searchResults", { listings, title, query });
  }
});

app.get("/privacy", (req, res) => {
  let title = "NoWhere-privacy";
  res.render("extras/privacy.ejs", { title })
});

app.get("/terms", (req, res) => {
  let title = "NoWhere | terms";
  res.render("extras/terms.ejs", { title })
});

app.all("*", (req, res, next) => {
  throw new ExpressError(404, "Page Not Found");
});

app.use(async (err, req, res, next) => {
  const {
    status = 500,
    message = "Something Went Wrong",
    title = "Error",
  } = err;
  await res
    .status(status)
    .render("extras/defaultError.ejs", { title, message });
  next();
});
