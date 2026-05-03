const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.post('/add', async function(req, res) {
    if (!req.session.username) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }

    var productId = req.body.productId;
    var products = req.app.locals.products;

    var product = await products.findOne({
        _id: new ObjectId(productId)
    });

    if (!product) {
        res.json({ success: false, message: 'Product not found' });
        return;
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push({
        productId: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description
    });

    res.json({ success: true, message: 'Added to cart' });
});

router.get('/cart', function(req, res) {
    if (!req.session.username) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    res.json({
        success: true,
        cart: req.session.cart
    });
});

router.post('/remove', function(req, res) {
    if (!req.session.username) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }

    var index = Number(req.body.index);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    if (index < 0 || index >= req.session.cart.length) {
        res.json({ success: false, message: 'Invalid item' });
        return;
    }

    req.session.cart.splice(index, 1);

    res.json({ success: true, message: 'Item removed' });
});

router.post('/clear', function(req, res) {
    if (!req.session.username) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }

    req.session.cart = [];

    res.json({ success: true, message: 'Cart cleared' });
});

router.post('/place', function(req, res) {
    if (!req.session.username) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }

    if (!req.session.cart || req.session.cart.length === 0) {
        res.json({ success: false, message: 'Cart is empty' });
        return;
    }

    var orders = req.app.locals.orders;

    var total = 0;

    for (var i = 0; i < req.session.cart.length; i++) {
        total = total + Number(req.session.cart[i].price);
    }

    var order = {
        username: req.session.username,
        items: req.session.cart,
        total: total,
        date: new Date()
    };

    orders.insertOne(order)
    .then(function(result) {
        req.session.cart = [];
        res.json({ success: true, message: 'Order placed successfully' });
    })
    .catch(function(err) {
        res.json({ success: false, message: 'Error placing order' });
    });
});

module.exports = router;