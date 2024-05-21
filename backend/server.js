const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/item.model'); // Import the model

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string with placeholders
 
// // Connect to MongoDB
const mongoURI = 'mongodb+srv://toufeequeali512:Atlas234@cluster0.xigh06j.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
});





const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Route to handle GET request to /items
app.get('/items', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Route to handle POST request to /items/add
app.post('/items/add', (req, res) => {
  const newItem = new Item(req.body);

  newItem.save()
    .then(item => res.status(200).json({ 'item': 'Item added successfully' }))
    .catch(err => res.status(400).send('Adding new item failed'));
});

// Route to handle DELETE request to /items/:id
app.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted successfully'))
    .catch(err => res.status(400).send('Error: ' + err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running successfully on port: ${PORT}`);
});