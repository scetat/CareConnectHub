const mongoose = require("mongoose");
const HomeContent = require("../models/HomeContent");

const dbURI =
  "mongodb+srv://atarsariya4295:Adarsh1202@cluster0.czaz8uw.mongodb.net/";

const seedData = {
  role: "Caretaker",
  heroImage: "client-home.png",
  heroText: "Helping Hands for Every Step of the Journey...",
  iconA: "care.png",
  headerA: "Expert Caregivers",
  paragraphA:
    "Our experienced caregivers provide compassionate, personalized care tailored to each individual's needs. Trust us to deliver reliable support that enhances well-being, ensuring comfort and peace of mind for your loved ones.",
  iconB: "care-support.png",
  headerB: "Supportive Care",
  paragraphB:
    "Our supportive care services offer compassionate, tailored assistance to enhance the quality of life for seniors. We provide emotional and practical support, ensuring comfort, dignity, and peace of mind for families and their loved ones.",
};

const seedDataCaregiver = {
  role: "Caregiver",
  heroImage: "caregiver.png",
  heroText: "",
  iconA: "medical.png",
  headerA: "Find Care Opportunities",
  paragraphA:
    "Discover caregiving opportunities that match your skills and schedule. Whether you're seeking full-time, part-time, or occasional work, we connect you with families who need your support and expertise, ensuring a fulfilling caregiving experience.",
  iconB: "caregiver-career.png",
  headerB: "Build Your Caregiver Profile",
  paragraphB:
    "Showcase your experience and qualifications by building a professional profile. Highlight your skills, availability, and areas of expertise to attract the right clients, and let families know how you can provide exceptional care.",
};

async function seedDatabase(roleData) {
  try {
    const existingContent = await HomeContent.findOne({ role: roleData.role });
    if (existingContent) {
      console.log(`HomeContent with role ${roleData.role} already exists. Updating...`);
      await HomeContent.findByIdAndUpdate(existingContent._id, roleData);
      console.log(`HomeContent for role ${roleData.role} updated successfully`);
    } else {
      console.log(`No existing HomeContent for role ${roleData.role}. Creating new document...`);
      const newContent = new HomeContent(roleData);
      await newContent.save();
      console.log(`HomeContent for role ${roleData.role} created successfully`);
    }

    console.log("Seeding completed for", roleData.role);
  } catch (error) {
    console.error(`Error seeding database for ${roleData.role}:`, error);
  }
}

async function runSeed() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the database");

    await seedDatabase(seedData);
    await seedDatabase(seedDataCaregiver);
  } catch (error) {
    console.error("Error during seeding process:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  }
}

runSeed();
