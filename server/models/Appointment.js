const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  time: {
    type: String,
    required: [true, 'Please add a time'],
  },
  kind: {
    type: String,
    required: [true, 'Please set patient type'],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
