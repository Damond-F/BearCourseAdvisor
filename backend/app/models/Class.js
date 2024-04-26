// models/Class.js
import { Schema, model } from 'mongoose';

mongoPW = os.getenv('MONGO_PW')
client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())   , 
db = client['classes']
cs = db['cs']

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
