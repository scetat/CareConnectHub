const mongoose = require("mongoose");
const HomeContent = require("../models/HomeContent");

const dbURI =
  "mongodb+srv://ogbunnamdi:1B8sbjVu47lHrWa2@cluster0.7gol3ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedData = {
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

async function seedDatabase() {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the database");

    const existingContent = await HomeContent.findOne();
    if (existingContent) {
      console.log("HomeContent already exists. Updating...");
      await HomeContent.findByIdAndUpdate(existingContent._id, seedData);
      console.log("HomeContent updated successfully");
    } else {
      console.log("No existing HomeContent. Creating new document...");
      const newContent = new HomeContent(seedData);
      await newContent.save();
      console.log("HomeContent created successfully");
    }

    console.log("Seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  }
}

seedDatabase();
