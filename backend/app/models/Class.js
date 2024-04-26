// models/Class.js
import { Schema, model } from 'mongoose';

const ClassSchema = new Schema({
  courseName: String,
  grades: Object, // Assuming grades is some kind of structured data
  redditText: Object, // Same here

  // ... any other fields you have ...
  comments: [{ type: String }], // Add this line to include comments
});

const db = mongoose.connection.useDb('cs');

const Class = db.model('Class', ClassSchema);

module.exports = Class;

export default model('Class', ClassSchema);
