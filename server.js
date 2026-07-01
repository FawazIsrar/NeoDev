const express = require('express');
const connectDB = require('./config/db');
connectDB();
const mongoose = require('mongoose');
const app = express();
app.get('/', (req, res) => res.send('API Running '));
app.use(express.json({ extended: false, limit: '1mb' }));
// Define Routes
const PORT = process.env.PORT || 5000;
app.use ('/api/users', require('./routes/api/users'));
app.use ('/api/profile', require('./routes/api/profile'));
app.use ('/api/auth', require('./routes/api/auth'));
app.use ('/api/posts', require('./routes/api/post'));
app.use ('/api/ai', require('./routes/api/ai'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;



