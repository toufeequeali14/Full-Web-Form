// models/item.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    age: Number,
    email: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;