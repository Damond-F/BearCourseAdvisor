const mongoose = require('mongoose');

// Define your schema - ensure field names match your database
const dataSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  description: {
    type: [String],
    required: false
  },
  generated_text: {
    type: String,
    required: true,
  },
  grades: {
    A_plus: { type: Number, required: true },
    A: { type: Number, required: true },
    A_minus: { type: Number, required: true },
    B_plus: { type: Number, required: true },
    B: { type: Number, required: true },
    B_minus: { type: Number, required: true },
    C_plus: { type: Number, required: true },
    C: { type: Number, required: true },
    C_minus: { type: Number, required: true },
    D: { type: Number, required: true },
    f: { type: Number, required: true },
    P: { type: Number, required: true },
    NP: { type: Number, required: true },
    average_course_gpa: { type: Number, required: true },
    average_letter_grade: { type: String, required: true },
  }
  // other fields...
});

// Compile and export the model
const dataModel = mongoose.model('cs', dataSchema);
module.exports = dataModel;
