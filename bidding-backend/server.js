const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Bidding System API is running...');
});

// Routes will be added here
// After app.use(express.json());
const requestRoutes = require('./routes/requestRoutes');
app.use('/api/requests', requestRoutes);

// app.use('/api/requests', require('./routes/requestRoutes'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
