
// routes/items.js
const router = require('express').Router();
let Item = require('../models/item.model');

CREATE
router.post('/add', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newItem = new Item({ name, description });

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



// UPDATE
router.post('/update/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.name = req.body.name;
      item.description = req.body.description;

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// READ
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});





// DELETE
router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id, { maxTimeMS: 30000 })
    .then(() => res.json('Item deleted successfully .'))
    .catch(err => res.status(400).send('Error: ' + err));
});

module.exports = router;