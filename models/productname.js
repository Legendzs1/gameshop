var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductName = new Schema(
  {
    name: {type: String, required: true, minlength: 3, maxlength: 100},
    description: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    price: {type: Number, required: true},
    iconurl: {type: String, required: true}
  }
);

// Virtual for game's URL
ProductName
.virtual('url')
.get(function () {
  return '/shop/game/' + this._id;
});

//Export model
module.exports = mongoose.model('Game', ProductName);