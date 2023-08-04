const mongoose = require('mongoose');

// Define the schema for the "reportList" collection
const enrollmentSchema = new mongoose.Schema({

  form1: Number,
  form2: Number,
  form3: Number,
  form4A: Number,
  form4B: Number,
  form5A: Number,
  form5B: Number,
  LSA: Number,
  LSS: Number,
  USA: Number,
  USS: Number
}, );
// { collection: 'reportEnrollment' }
// Create the Mongoose model for the "reportList" collection
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
