var ProductName = require('../models/productname')
var Genre = require('../models/genre')

var async = require('async')

exports.index = function(req, res) {
    async.parallel({
        game_count: function(callback) {
            ProductName.countDocuments({}, callback); // Pass an empty object as match to find all documents of this collection
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', {title: 'Game Store Home', error: err, data: results});
    });
};

//Display list of all games
exports.product_list = function(req, res, next) {
    ProductName.find({}, 'name genre')
    .populate('genre')
    .exec(function (err , list_products) {
        if(err) { return next(err);}
        //Successful, so render
        res.render('game_list', { title: 'Games', product_list: list_products});
    });
};

//Display detail page for a specific game
exports.product_detail = function(req, res, next) {
    ProductName.findById(req.params.id)
    .exec(function (err, results) {
        if (err) { return next(err); }
        //successful, render
        console.log(results)
        res.render('game_detail', {title: results.name, desc: results.description})
    }) 
}

//TODO create password protected route 


//Display game create form on GET
exports.game_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game create GET')
}
//Handle game create form on POST
exports.game_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game create POST')
}

//Display game delete form on GET
exports.game_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game delete GET')
}

//Handle game delete form on POST
exports.game_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game delete POST')
}

//Display game update form on GET
exports.game_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game update GET')
}

//Handle game update form on POST
exports.game_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game update POST')
}