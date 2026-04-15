const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: String,
  town: String,
  address: String,
  price: String,
  images: [String],
  date: String,
  time: String,
  description: String,

  
  _ownerId: {
    type: ObjectId,
    ref: "User",
    required: true
  },

  
  participants: [{
    type: ObjectId,
    ref: "User"
  }]

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Event', eventSchema);
