"use strict";

const express = require('express');
const app = express();

// 1. Data Initialization
let users = []; 
let nextId = 1;

// 2. Middleware (MUST come before routes)
// This allows the server to read JSON sent from your fetch() call
app.use(express.json());
// This serves your HTML/JS files from the 'public' folder
app.use(express.static('public'));


// 3. Routes

/**
 * GET /users
 * Returns the current list of all submitted users as JSON.
 */
app.get('/users', (req, res) => {
    res.json(users);
});

/**
 * POST /users
 * Receives a new user name, stores it, and returns the new user object.
 */
app.post('/users', (req, res) => {
    const name = req.body.name;

    // Validation: Check if name is missing or empty
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
    }

    // Create the new user object
    const newUser = { 
        id: nextId++, 
        name: name 
    };

    // Add to our global list
    users.push(newUser);

    // Return the new user with '201 Created' status
    res.status(201).json(newUser);
});


// 4. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});