const mongoose = require('mongoose');

const liveStreamSchema = new mongoose.Schema({
  streamer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  streamUrl: { type: String }, // נניח משתמשים ב־YouTube או שירות חיצוני
  isLive: { type: Boolean, default: false },
  startedAt: { type: Date },
  endedAt: { type: Date }
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);
