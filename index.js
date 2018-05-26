var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local");
	path 				  = require('path');
	
	
mongoose.connect("mongodb://localhost/Calendrier");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret : "Gueddou Ouakouche",
    resave: false,
    saveUninitialized: false
}));

var db = require('mongoskin').db("mongodb://localhost/Calendrier", { w: 0});
	db.bind('evenement');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/initialisation', function(req, res){
	db.evenement.insert({ 
		titre:"soutenance AWS", 
		date_debut: new Date(2018,4,30),
		date_fin:	new Date(2018,4,31),
		color: "#78e000"
	});
	db.evenement.insert({ 
		titre:"soutenance Prog. et GL", 
		date_debut: new Date(2018,4,31),
		date_fin:	new Date(2018,5,1),
		color: "#788ad6"
	});
	db.evenement.insert({ 
		titre:"soutenance TER", 
		date_debut: new Date(2018,5,1),
		date_fin:	new Date(2018,5,2),
		color: "#DD8616"
	});

	res.send("initialisation des evenements avec succeès")
});


app.get('/data', function(req, res){
	db.evenement.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});


app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","application/json");
		res.send({action: mode, sid: sid, tid: tid});
	}

	if (mode == "updated")
		db.evenement.updateById( sid, data, update_response);
	else if (mode == "inserted"){
		db.evenement.insert(data, update_response);
		//db.evenement.updateById( sid, {color: "#788ad6"}, update_response);
		}
	else if (mode == "deleted")
		db.evenement.removeById( sid, update_response);
	else
		res.send("operation non supportée");
});


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get("/", function(req, res){
    res.render("home");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/home");
}

//show sign up form
app.get("/home", function(req, res){
   res.render("home"); 
});


app.get("/dashboard",isLoggedIn, function(req, res){
   res.render("dashboard"); 
});

//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username, color: req.body.color}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('home');
        }
		color: req.body.color
        passport.authenticate("local")(req, res, function(){
        //res.redirect("dashboard", {color: req.body.color });
        res.render("dashboard", {color: req.body.color });
        
        });
    });
});


app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/home"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});





app.listen(8082, function() {
    console.log(new Date().toISOString() + ": server started on port 8082");
});