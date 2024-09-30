const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');
const Address = require('../models/Address');
const State = require('../models/State');
const Country = require('../models/Country');

const router = express.Router();

//Signup Route
router.post('/signup', async (req, res) => {
  console.log('Received data:', req.body); 

  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    houseNo, 
    street,
    city, 
    zipCode,
    stateName, 
    countryName, 
    roleName, 
    password, 
    confirmPassword 
  } = req.body;


  const Validphone = /^[0-9]{10}$/;
  if (!Validphone.test(phone)) {
    return res.status(400).json({ message: 'Invalid mobile number format.' });
  }

  const StrongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
  if (!StrongPass.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long, include at least 1 uppercase letter, 1 lowercase letter, and 1 special character.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match!" });
  }

  try {
    let user = await User.findOne({ Email: email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let role = await Role.findOne({ RoleName: roleName });
    if (!role) {
      role = new Role({ RoleName: roleName });
      await role.save();
    }

    let country = await Country.findOne({ CountryName: countryName });
    if (!country) {
      country = new Country({ CountryName: countryName });
      await country.save();
    }

    let state = await State.findOne({ StateName: stateName, Country: country._id });
    if (!state) {
      state = new State({ StateName: stateName, Country: country._id });
      await state.save();
    }

    const address = new Address({
      houseNo: houseNo,
      Street: street, 
      City: city,
      ZipCode: zipCode,
      State: state._id
    });
    await address.save();

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      Password: hashedPassword, 
      Role: role._id,
      Address: address._id
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const { Password, ...userInfo } = user._doc;
    return res.status(200).json({ message: 'Login successful', user: userInfo });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
