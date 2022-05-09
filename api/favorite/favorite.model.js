const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('favorite', favoriteSchema);