var ProductName = require('../models/productname')
var Genre = require('../models/genre')

var async = require('async')
const { body,validationResult } = require('express-validator');

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
        res.render('game_detail', {title: results.name, desc: results.description})
    }) 
}

//TODO create password protected route 


//Display game create form on GET
exports.game_create_get = function(req, res, next) {
    Genre.find({}, 'name')
    .exec(function (err, list_genres) {
        if(err) {return next(err);}
        //Successful, render
        res.render('game_form', { title: 'Create Game', genre_list: list_genres});
    });
};
//Handle game create form on POST
exports.game_create_post = [
    // Validate and sanitise fields.
    body('game_name').trim().isLength({ min: 3 }).escape().withMessage('Game name must be specified.'),
    body('desc').trim().isLength({ min: 3 }).escape().withMessage('Description must be specified.'),
    body('price').trim().isLength({ min: 1 }).escape().withMessage('Price must be specified.'),
    body('iconurl').trim().isLength({ min: 1 }).escape().withMessage('URL must be specified.'),  
    //body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            Genre.find({}, 'name')
            .exec(function (err, list_genres) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('game_form', { title: 'Create Game', genre_list: list_genres, game: req.body, errors: errors.array() });
            return;
            });
        }
        else {
            // Data from form is valid.
            // Create an Product object with escaped and trimmed data.
            var game = new ProductName(
                {
                    name: req.body.game_name,
                    description: req.body.desc,
                    genre: req.body.genre,
                    price: req.body.price,
                    iconurl: req.body.iconurl,
                });
                game.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new game record.
                res.redirect(game.url);
            });
        }
    }
];

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