const express = require('express');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI environment variable is missing.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is missing.");
  process.exit(1);
}

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



