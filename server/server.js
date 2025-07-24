const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const connectDB = require('./config/database');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const { loadInitialProducts } = require('./utils/dataLoader');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

connectDB().then(() => {
  loadInitialProducts();
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'api-docs.html'));
});

app.use('/api', apiRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/docs`);
});

