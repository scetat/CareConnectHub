const mongoose = require('mongoose');
const Role = require('../models/Role'); // Adjust the path to your Role model

const seedRoles = async () => {
  try {
    await mongoose.connect('mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const roles = ['Admin', 'User'];

    for (const roleName of roles) {
      const existingRole = await Role.findOne({ RoleName: roleName });
      if (!existingRole) {
        await Role.create({ RoleName: roleName });
        console.log(`Role "${roleName}" created.`);
      } else {
        console.log(`Role "${roleName}" already exists.`);
      }
    }

    console.log('Roles seeded successfully.');
  } catch (error) {
    console.error('Error seeding roles:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

seedRoles();
