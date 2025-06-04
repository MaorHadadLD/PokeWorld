const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  startPrice: { type: Number, required: true },
  bids: [
    {
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: { type: Number },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  isOpen: { type: Boolean, default: true },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auction', auctionSchema);
