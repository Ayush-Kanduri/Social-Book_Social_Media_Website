//Require the User Model Data Structure
const User = require("../models/user");

//Export the Users Controller's profile() Function
module.exports.profile = (request, response) => {
	// return response.end("<h1>Users Profile</h1>");
	User.findById(request.params.id, (err, user) => {
		if (err) {
			console.log("Error in finding user in profile");
			return;
		}
		return response.render("user_profile", {
			title: "User Profile",
			profile_user: user,
		});
	});
};

//Export the Users Controller's update() Function
module.exports.update = (req, res) => {
	if (req.params.id == req.user.id) {
		// User.findByIdAndUpdate(req.params.id, {name:req.body.name, email:req.body.email})
		User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
			req.flash("success", "Profile updated !!!");
			return res.redirect("back");
		});
	} else {
		return res.status(401).send("Unauthorized");
	}
};

//Export the Users Controller's signUp() Function
module.exports.signUp = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_up", {
		title: "Sign Up",
	});
};

//Export the Users Controller's signIn() Function
module.exports.signIn = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_in", {
		title: "Login",
	});
};

//Export the Users Controller's createUser() Function
module.exports.createUser = (req, res) => {
	if (req.body.password !== req.body.confirm_password) {
		req.flash("error", "Password didn't match !!!");
		return res.redirect("back");
	}

	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			req.flash("error", err);
			return;
		}

		if (!user) {
			User.create(req.body, (err, user) => {
				if (err) {
					console.log("Error in creating user while signing up");
					return;
				}
				req.flash("success", "User created !!!");
				return res.redirect("/users/login");
			});
		} else {
			req.flash("error", "User exists !!!");
			return res.redirect("back");
		}
	});
};

//Export the Users Controller's createSession() Function
module.exports.createSession = (req, res) => {
	//User is Signed In & we need to redirect to the Home Page
	req.flash("success", "Logged In Successfully !!!");
	return res.redirect("/");
};

//Export the Users Controller's destroySession() Function
module.exports.destroySession = (req, res) => {
	//PassportJS provides logout() Function to the Request Object
	//User is Signed Out & redirected to the Home Page
	req.logout();
	req.flash("success", "Logged Out Successfully !!!");
	return res.redirect("/");
};
