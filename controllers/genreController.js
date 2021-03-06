var Genre = require('../models/genre');
var ProductName = require('../models/productname')
var async = require('async');
const { body, validationResult, sanitizeBody } = require('express-validator');

//Display list of all Genres
exports.genre_list = function(req, res, next) {
    Genre.find({}, 'name')
    .exec(function (err, list_genres) {
        if(err) {return next(err);}
        //Successful, render
        res.render('genre_list', { title: 'Genres', genre_list: list_genres});
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
exports.genre_create_get = function(req, res, next) {     
    res.render('genre_form', { title: 'Create Genre' });
  };
// Handle Genre create on POST.
exports.genre_create_post =  [
   
    // Validate that the name field is not empty.
    body('name', 'Genre name required').trim().isLength({ min: 3 }),
    
    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a genre object with escaped and trimmed data.
      var genre = new Genre(
        { name: req.body.name }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        Genre.findOne({ 'name': req.body.name })
          .exec( function(err, found_genre) {
             if (err) { return next(err); }
  
             if (found_genre) {
               // Genre exists, redirect to its detail page.
               res.redirect(found_genre.url);
             }
             else {
  
               genre.save(function (err) {
                 if (err) { return next(err); }
                 // Genre saved. Redirect to genre detail page.
                 res.redirect(genre.url);
               });
  
             }
  
           });
      }
    }
  ];

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

//Handles genre delete form on GET 
exports.genre_delete_form_get = function(req, res) {
  res.render('genre_delete_form', {title: 'Delete a Genre'});
}

//Handles genres delete form on POST
exports.genre_delete_form_post = [
  (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('genre_delete_form', { title: 'Delete a Genre', errors: errors.array()});
        return;
      }
      else {
        var query = {name:req.body.name}
        Genre.find(query)
        .exec(function(err, result) {
          console.log(result[0]._id)
          Genre.findByIdAndRemove(result[0]._id, function deleteGenre(err) {
            if (err) { return next(err); }
            res.redirect('/shop/genre')
          })
      })
    }
  }
]