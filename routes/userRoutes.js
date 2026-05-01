const express = require('express');
const router = express.Router();

router.post('/register', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.json({ success: false, message: 'Please fill in all fields' });
        return;
    }

    const users = req.app.locals.users;

    const existingUser = await users.findOne({ username: username });

    if (existingUser) {
        res.json({ success: false, message: 'Username already exists' });
        return;
    }

    await users.insertOne({
        username: username,
        password: password
    });

    res.json({ success: true, message: 'Account created' });
});

router.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const users = req.app.locals.users;

    const user = await users.findOne({
        username: username,
        password: password
    });

    if (!user) {
        res.json({ success: false, message: 'Invalid username or password' });
        return;
    }

    req.session.username = username;

    res.json({ success: true, message: 'Login successful' });
});

router.get('/check', function(req, res) {
    if (req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        res.redirect('/login.html');
    });
});

module.exports = router;