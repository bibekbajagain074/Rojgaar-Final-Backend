const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  sector: {
    type: String,
    required: false,
    min: 3,
  },
  country: {
    type: String,
    required: false,
    min: 3,
  },
  region: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
    max: 50,
  },
  phone: {
    type: String,
    required: false,
    maxlength: 10,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: true,
  },
  avatarImage: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

module.exports = mongoose.model("Company", companySchema);
