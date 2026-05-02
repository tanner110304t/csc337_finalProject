const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    const products = req.app.locals.products;

    const count = await products.countDocuments();

    if (count === 0) {
        await products.insertMany([
            {
                name: "Classic Black T-Shirt",
                category: "Shirts",
                price: 24.99,
                description: "Simple black cotton t-shirt for everyday wear."
            },
            {
                name: "White Oversized Tee",
                category: "Shirts",
                price: 27.99,
                description: "Relaxed fit white shirt with a clean streetwear look."
            },
            {
                name: "Navy Athletic Shirt",
                category: "Shirts",
                price: 29.99,
                description: "Lightweight athletic shirt for casual wear or workouts."
            },
            {
                name: "Graphic Logo Tee",
                category: "Shirts",
                price: 32.99,
                description: "Comfortable graphic tee with a simple front design."
            }
        ]);
    }

    const productList = await products.find({}).toArray();

    res.json({ success: true, products: productList });
});

module.exports = router;