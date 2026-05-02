const express = require('express');
const router = express.Router();

<<<<<<< HEAD
router.get('/', function(req, res) {
    res.send('Order route is working');
=======
// Example route
router.get('/', (req, res) => {
    res.send('Module route is working!');
>>>>>>> 3d3f43065c8c84ed539db8b60ee0b41f0a698c14
});

module.exports = router;