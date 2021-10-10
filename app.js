var express = require ("express"),
    port = process.env.PORT || 5000,
    bodyParser = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    
    res.render("index");
});


app.get("/xmt", function(req, res) {
    
    res.render("xmt");
});




app.listen(port, function(){
    console.log("server just started")
});