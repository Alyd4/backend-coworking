const express = require('express');
const sequelize = require('./config/sequelize');
const adminRoutes = require('./routes/admin');  // Admin and all users route
const nonAdminRoutes = require('./routes/nonAdminRoutes.js'); // Non-admin users route
const auth = require('./routes/auth');
const ItemRoutes = require('./routes/item.js');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/Produk', express.static(path.join(__dirname, 'Produk')));

app.use('/api/admin', adminRoutes);  // Admin and all users route
app.use('/api/nonadminusers', nonAdminRoutes);  // Non-admin users route
app.use('/api/auth', auth);
app.use('/api/item', ItemRoutes);



// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
