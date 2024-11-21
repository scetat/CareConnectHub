const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model
const Role = require('../models/Role'); // Adjust the path to your Role model

const seedAdminUser = async () => {
  try {
    await mongoose.connect('mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Fetch the "Admin" role
    const adminRole = await Role.findOne({ RoleName: 'Admin' });
    if (!adminRole) {
      throw new Error('Admin role not found. Please seed roles first.');
    }

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ Email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10); // Replace with a secure password
    const adminUser = new User({
      FirstName: 'Admin',
      LastName: 'User',
      Email: 'admin@example.com',
      Phone: '1234567890',
      Password: hashedPassword,
      Role: adminRole._id, // Assign the "Admin" role
      Address: null, // Provide a default or dummy address if necessary
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

seedAdminUser();
