// Load environment variables from the .env file
require('dotenv').config();

const dns = require('dns');
// Force Node.js to use Google and Cloudflare's public DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');

const app = express();
const port = 8080;

// --- MIDDLEWARE ---
// Parse incoming JSON and URL-encoded data from frontend forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// Configure Session Management
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if deploying with HTTPS
}));

// --- DATABASE CONNECTION ---
// Configure data persistence using MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas");

        const db = client.db("ECommerceDB");

        // Attach collections to app.locals so they can be accessed inside your router files
        // Each collection acts as the data source for one of your interconnected modules 
        app.locals.users = db.collection("users");
        app.locals.products = db.collection("products");
        app.locals.orders = db.collection("orders");

    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}
connectDB().then(function() {
    const userRoutes = require('./routes/userRoutes');
    const productRoutes = require('./routes/productRoutes');
    const orderRoutes = require('./routes/orderRoutes');

    app.use('/users', userRoutes);
    app.use('/products', productRoutes);
    app.use('/orders', orderRoutes);

    app.listen(port, function() {
        console.log("Server is running at http://localhost:" + port);
    });
});