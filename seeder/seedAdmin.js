const bcrypt = require('bcryptjs');
const User = require('../models/user');

const seedAdmin = async () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  try {
    const user = await User.findOne({ where: { email: adminEmail } });

    if (user) {
      console.log('Admin user already exists');
      return;
    }


    await User.create({
    
      email: adminEmail,
      password: adminPassword,
      isAdmin: true,
    });

    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

seedAdmin();
