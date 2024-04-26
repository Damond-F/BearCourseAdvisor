// controllers/commentsController.js
import { findOneAndUpdate } from '../models/Class';

export async function postComment(req, res) {
  const { courseCode } = req.params;
  const { comment } = req.body;

  try {
    // Find the class document by a unique identifier, such as `courseName`
    // and update it by pushing a new comment into the `comments` array
    const updatedClass = await findOneAndUpdate(
      { courseName: courseCode },
      { $push: { comments: comment } },
      { new: true, upsert: true }
    );
    
    res.json(updatedClass);
  } catch (error) {
    res.status(500).send(error);
  }
}
