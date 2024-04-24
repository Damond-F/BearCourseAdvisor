// routes/comments.js
import { Router } from 'express';
const router = Router();
import { getComments, postComment } from '../controllers/commentsController';

router.get('/:courseCode', getComments);
router.post('/:courseCode', postComment);

export default router;
