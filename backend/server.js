const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dataModel = require('./models/dataModel')

const cors = require('cors')
app.use(cors())

app.use(express.json())

mongoose.connect(`mongodb+srv://BearCourseAdivsor:2skchvnjBwa6ays9@cluster0.7jj4shw.mongodb.net/classes`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/getText', async (req, res) => {
    try {
        // Using the model to query all documents and select specific fields
        const courseData = await dataModel.find({}, 'courseName description generated_text grades');
        // If there's no data, respond accordingly
        if (courseData.length === 0) {
            return res.status(404).json({ message: "No data fouvnd" });
        }
        // Map over the array of documents to format the response
        const responseData = courseData.map(course => ({
            courseName: course.courseName,
            description: course.description,
            generated_text: course.generated_text,
            grades: course.grades
        }));
        // Send the formatted response data
        res.json(responseData);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send({ message: "Internal Server Error" }); // Send a JSON response with the error message
    }

});



app.listen(3001, () => {
    console.log('server is running')
})