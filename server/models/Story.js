const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const messageSchema = new mongoose.Schema({
  messagebody: String,
  picture: String,
  index: Number
});

const storySchema = new mongoose.Schema({
  messages: [messageSchema],
  storyId: String,
  created: {
    type: Date,
    default: Date.now
  }
});

storySchema.pre("save", async function(next) {
  if (!this.isModified("stories")) {
    next(); // skip it
    return; // stop this function from running
  }

  const newStoryId = function() {
    let rnd = String(Math.random());
    return rnd.slice(-5);
  };

  this.storyId = newStoryId();
  next();
});

module.exports = mongoose.model("Story", storySchema);
