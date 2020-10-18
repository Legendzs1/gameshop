var User = require('../models/user')
var async = require('async');


function testPW(pw1, pw2) {
    if(pw1 === pw2) {
        return true
    }
    return false
}

exports.admin_get = function(req,res) {
    res.render('admin', {text: "Enter... If you Dare"});
}

/* exports.admin_post = function(req,res) {
    //res.send("tesxt")
    res.render('admin_detail', {text: "admin detail Under construction"});
} */

exports.admin_post = function(req,res,next) {
    User.find({}, 'password')
    .exec(function (err, passwordCheck) {
        if (err) { return next(err); }
        var password2 = req.body.password; 
        if(testPW(passwordCheck[0].password, password2) === true) {
            res.redirect("/shop/admin/control")
        }
        else {res.render('admin', {text: "Enter... If you Dare", errors: "Wrong Password!"})};
        //if(err) {return next(err);}
    })
};

exports.admin_detail_get = function(req,res) {
    res.render("admin_detail", {text: "Your Wish is my Command, Master."})
}


