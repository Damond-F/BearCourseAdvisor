// models/Comment.js
import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  courseCode: String,
  comments: [String],
});

export default model('Comment', CommentSchema);
