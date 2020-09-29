var Genre = require('../models/genre');
var ProductName = require('../models/productname')
var async = require('async');

//Display list of all Genres
exports.genre_list = function(req, res, next) {
    Genre.find({}, 'name')
    .exec(function (err, list_genres) {
        if(err) {return next(err);}
        //Successful, render
        res.render('genre_list', { title: 'Genre', genre_list: list_genres});
    });
};

//Display detail page for a specific genre
exports.genre_detail = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback);
        },
        genre_games: function(callback) {
            ProductName.find({ 'genre': req.params.id })
                .exec(callback); 
        },
    }, function(err, results) {
        if(err) {return next(err); }
        if(results.genre==null){//no results
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        //Success. Render
        res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_games: results.genre_games } );
    });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('Not implemented: genre create GET')
}
// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('Not implemented: genre create POST')
}

//Display Genre delete form on GET
exports.genre_delete_get = function(req, res) {
    res.send('Not implemented: genre delete GET')
}

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};