const mongoose = require("mongoose");

const HomeContentSchema = new mongoose.Schema({
  heroImage: { type: String, required: true },
  heroText: { type: string },
  iconA: { type: String, required: true },
  headerA: { type: String, required: true },
  paragraphA: { type: String, required: true },
  iconB: { type: String, required: true },
  headerB: { type: String, required: true },
  paragraphB: { type: String, required: true },
});

const HomeContent = mongoose.model("HomeContent", HomeContentSchema);
module.exports = HomeContent;
