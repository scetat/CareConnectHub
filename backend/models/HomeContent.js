const mongoose = require("mongoose");

const HomeContentSchema = new mongoose.Schema({
  role: { type: String, required: true },
  heroImage: { type: String, required: true },
  heroText: { type: String },
  iconA: { type: String, required: true },
  headerA: { type: String, required: true },
  paragraphA: { type: String, required: true },
  iconB: { type: String, required: true },
  headerB: { type: String, required: true },
  paragraphB: { type: String, required: true },
});

const HomeContent = mongoose.model("HomeContent", HomeContentSchema);
module.exports = HomeContent;
