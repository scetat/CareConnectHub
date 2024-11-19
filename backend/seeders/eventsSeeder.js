const mongoose = require("mongoose");

// Define the event schema (if not already defined in your project)
const eventSchema = new mongoose.Schema({
  event_name: String,
  description: String,
  date: String,
  time: String,
  address: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

// Define the Event model (replace 'Event' with the model name in your project)
const Event = mongoose.model("Event", eventSchema);

// Seed data
const eventSeedData = [
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc0e"),
    event_name: "Learning for Life: Education for Caretakers",
    description:
      "Expand your knowledge and learn valuable life skills at Learning for Life! This educational event is designed for caretakers, providing helpful information on managing day-to-day tasks, maintaining your health, and staying active. Led by experienced professionals, this seminar will empower you to live independently with confidence.",
    date: "November 7, 2024",
    time: "1:00 PM – 3:00 PM",
    address: "Grand River Hospital, 835 King St W, Kitchener, ON N2G 1G3",
    imageUrl:
      "https://www.goodnewsfinland.com/.imaging/default/dam/gnf/2022/five-from-finland/fff_lifelong-learning_credit-julia-helminen-2-2913134.jpeg/jcr:content.jpeg",
    createdAt: new Date("2024-10-03T05:30:30.804Z"),
    updatedAt: new Date("2024-10-03T05:30:30.804Z"),
  },
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc10"),
    event_name: "Relaxation & Pampering Retreat",
    description:
      "Treat yourself to a day of relaxation at our Relaxation & Pampering Retreat! This event is all about helping caretakers unwind and enjoy soothing activities like massage therapy, gentle yoga, and more. Reconnect with your body and mind in a serene, peaceful environment designed just for you.",
    date: "November 18, 2024",
    time: "9:00 AM – 12:00 PM",
    address: "Chicopee Ski & Summer Resort, 396 Morrison Rd, Kitchener, ON N2A 2Z6",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.timeout.com%2Fimages%2F102836797%2Fimage.jpg&f=1&nofb=1&ipt=2c4dc6f13e386cce25cc695f1fd387ae72fe2d5da0119cd53fd5ee8db263d0df&ipo=images",
    createdAt: new Date("2024-10-03T05:30:30.805Z"),
    updatedAt: new Date("2024-10-03T05:30:30.805Z"),
  },
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc0f"),
    event_name: "Family Fun & Support Day",
    description:
      "Strengthen your bonds with loved ones at Family Fun & Support Day! Enjoy fun activities, games, and workshops designed to bring families closer together. This event encourages caretakers and their families to connect, communicate, and support each other. It's a wonderful opportunity to enjoy quality time with family while learning ways to enhance your care experience.",
    date: "October 22, 2024",
    time: "11:00 AM – 2:00 PM",
    address: "Victoria Park Pavilion, 80 Schneider Ave, Kitchener, ON N2G 1K9",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.creativeevents.ie%2Fwp-content%2Fuploads%2F2016%2F01%2FFamily-Fun-4.jpg&f=1&nofb=1&ipt=5b14e65b9e6b421eceae93fc8d71fcf10975715c9d6e94a14c85b8985f885780&ipo=images",
    createdAt: new Date("2024-10-03T05:30:30.804Z"),
    updatedAt: new Date("2024-10-03T05:30:30.804Z"),
  },
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc11"),
    event_name: "Cooking & Nutrition for a Healthy You",
    description:
      "Learn how to prepare easy, nutritious meals at Cooking & Nutrition for a Healthy You! This interactive workshop focuses on simple recipes that can improve your health and well-being. Perfect for caretakers who want to maintain their independence, this class will guide you through healthy eating habits and cooking techniques that fit your lifestyle.",
    date: "October 28, 2024",
    time: "2:00 PM – 4:00 PM",
    address: "765 King St E, Kitchener, ON N2G 2M6",
    imageUrl:
      "https://prepareforchange.net/wp-content/uploads/2019/10/6-tips-to-make-good-nutrition-and-healthy-eating-easier.jpg",
    createdAt: new Date("2024-10-03T05:30:30.805Z"),
    updatedAt: new Date("2024-10-03T05:30:30.805Z"),
  },
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc12"),
    event_name: "Mindfulness & Stress Relief Session",
    description:
      "Are you feeling stressed or overwhelmed? Join us for a Mindfulness & Stress Relief Session to learn techniques that help calm the mind and reduce stress. This session is designed for caretakers and focuses on simple mindfulness exercises you can practice daily to improve your mental well-being.",
    date: "November 12, 2024",
    time: "2:00 PM – 3:30 PM",
    address: "180 Weber St N, Kitchener, ON N2H 3Z9",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd39ziaow49lrgk.cloudfront.net%2Fwp-content%2Fuploads%2F2015%2F07%2FHow-to-Reduce-Stress-with-Mindfulness-Meditation.jpg%3Fx16148&f=1&nofb=1&ipt=bef3a65b0dbed5e59fd0aa8fc48d89fb03a89ea4d2b88d251e99d4e1c41c8d4e&ipo=images",
    createdAt: new Date("2024-10-03T05:30:30.805Z"),
    updatedAt: new Date("2024-10-03T05:30:30.805Z"),
  },
  {
    _id: mongoose.Types.ObjectId("66fe2bf693ac44de0b4afc0d"),
    event_name: "Health Check & Wellness Day",
    description:
      "Take control of your health! Join us for Health Check & Wellness Day, where you can receive free health screenings and personalized wellness advice. Meet healthcare professionals who will guide you through managing chronic conditions and improving your daily well-being. This event is designed to provide valuable health resources to those who need care and support.",
    date: "October 15, 2024",
    time: "10:00 AM – 1:00 PM",
    address: "Kitchener Market, 300 King St E, Kitchener, ON N2G 2L3",
    imageUrl: "https://health-clinic.co.uk/wp-content/uploads/2020/03/Health-checks-01-1024x320.jpg",
    createdAt: new Date("2024-10-03T05:30:30.804Z"),
    updatedAt: new Date("2024-10-03T05:30:30.804Z"),
  },
];

// Connect to MongoDB and insert seed data
mongoose
  .connect(
    "mongodb+srv://ogbunnamdi:cerberus@cluster0.7gol3ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");

    // Insert the seed data
    Event.insertMany(eventSeedData)
      .then(() => {
        console.log("Event data seeded successfully");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error seeding event data:", err);
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
