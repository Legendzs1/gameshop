var express = require('express');
var router = express.Router();

//require controller modules
var product_name_controller = require('../controllers/productController')
var genre_controller = require('../controllers/genreController')
var admin_controller = require('../controllers/adminController')
// product routes // 

//GET product/games home page
router.get('/', product_name_controller.index); // /shop HOME

//GET request for creating a new Game/product
router.get('/admin/game/create', product_name_controller.game_create_get)

//POST request to create a Game 
router.post('/admin/game/create', product_name_controller.game_create_post)

//GET request to delete a game form
router.get('/admin/game/delete', product_name_controller.game_delete_form_get)

//POST request to delete a game form
router.post('/admin/game/delete', product_name_controller.game_delete_form_post)

//GET request to delete a game
router.get('/admin/game/:id/delete', product_name_controller.game_delete_get)

//POST request to delete a game
router.post('/admin/game/:id/delete', product_name_controller.game_delete_post)

//GET request to update a game
router.get('/admin/game/:id/update', product_name_controller.game_update_get)

//POST request to update a game
router.post('/admin/game/:id/update', product_name_controller.game_update_post)

//GET request for one game
router.get('/game/:id', product_name_controller.product_detail)

//GET request for list of all GAME items
router.get('/game', product_name_controller.product_list)

// Genre routes //

//GET request for creating Genre
router.get('/admin/genre/create', genre_controller.genre_create_get)

//POST request for creating Genre
router.post('/admin/genre/create', genre_controller.genre_create_post)

//GET request for deleting Genre form
router.get('/admin/genre/delete', genre_controller.genre_delete_form_get)

//POST request for deleting Genre form
router.post('/admin/genre/delete', genre_controller.genre_delete_form_post)

//GET request for deleting Genre
router.get('/admin/genre/:id/delete', genre_controller.genre_delete_get)

//POST request for deleting genre
router.post('/admin/genre/:id/delete', genre_controller.genre_delete_post)

//GET request to update Genre
router.get('/admin/genre/:id/update', genre_controller.genre_update_get)

//POST request to update Genre
router.post('/admin/genre/:id/update', genre_controller.genre_update_post)

//GET request for one Genre
router.get('/genre/:id', genre_controller.genre_detail)

//GET request for list of all genres
router.get('/genre', genre_controller.genre_list)

//GET request for admin 
router.get('/admin', admin_controller.admin_get);

//POST request for admin 
router.post('/admin/', admin_controller.admin_post);

//POST request for admin 
router.get('/admin/control', admin_controller.admin_detail_get);




module.exports = router;