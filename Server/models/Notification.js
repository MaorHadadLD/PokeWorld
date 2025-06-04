const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  proposer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proposerCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  receiverCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
