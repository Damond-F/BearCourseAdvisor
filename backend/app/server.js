// server.js
import express, { json } from 'express';
import { connect } from 'mongoose';

const app = express();

// Middleware
app.use(json());

// Connect to MongoDB Atlas
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.error(err));

// Define routes
app.use('/api/comments', require('./routes/comments').default);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
