const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default:
      "https://ui-avatars.com/api/?background=00ff99&color=000&name=User"
  },

  bio: {
    type: String,
    default: ""
  },

  isPremium: {
    type: Boolean,
    default: false
  },
  profileImage: {
  type: String,
  default: ""
},

bio: {
  type: String,
  default: ""
}

},
{
  timestamps: true
});

module.exports =
  mongoose.model(
    "User",
    userSchema
  );