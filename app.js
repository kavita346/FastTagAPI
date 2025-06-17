const express = require('express');
require('dotenv').config();
const fastagRoutes = require('./routes/fastagRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/fastag', fastagRoutes);

app.listen(PORT, () => {
  console.log(`FASTag API Server running on port ${PORT}`);
});
