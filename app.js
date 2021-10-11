const express         = require ("express"),
    dotenv         = require ("dotenv"),
    app             = express(),
    PORT            = process.env.PORT || 5000,
    connectDB       = require('./config/db'),
    morgan          = require('morgan'),
    mongoose          = require('mongoose'),
    session          = require('express-session'),
    MongoStore       = require('connect-mongo')(session),
    bodyParser      = require ("body-parser"),
    fetch           = require ("node-fetch"),
    methodOverride  = require("method-override"),
    Post            = require ("./models/post"),
    Comment         = require ("./models/comment"),
    Clip         = require ("./models/clip"),
    ClipComment         = require ("./models/clipComment"),

    passport        = require ("passport"),
    flash           =  require("connect-flash"),
    LocalStrategy   = require ("passport-local"),
    User            = require ("./models/User"),
    
    // indexRoutes = require("./routes/index"),
    postRoutes = require("./routes/posts"),
    commentRoutes = require("./routes/comments"),
    clipRoutes    = require("./routes/clips"),
    salesRoutes   = require("./routes/sales"),
    shortstoriesRoutes   = require("./routes/shortstories"),
    url             = "mongodb://localhost/mqj_blog";

// Load config
dotenv.config( { path: './config/config.env' })

connectDB()
 
app.use(bodyParser.urlencoded({extended: true}, { useNewUrlParser: true }));
app.use(express.static(__dirname + "/public"));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.set("view engine", "ejs");


app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
require('./config/passport')(passport)

// Sessions
app.use(
  session({
  secret: "Allah is great",
  resave: false,
  saveUninitialized: false,
  // Save session in DB
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next ){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

//requiring routes
app.use("/", require('./routes/index'));
app.use("/auth", require('./routes/auth'));
app.use("/posts", postRoutes); 
app.use("/posts/:id/comments", commentRoutes);
app.use("/clips", clipRoutes);
app.use("/sales", salesRoutes);
app.use("/shortstories", shortstoriesRoutes);


app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_env} mode on port ${PORT}`)
  )