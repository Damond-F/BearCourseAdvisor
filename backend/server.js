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
        const courseData = await dataModel.find({}, 'courseName description generated_text grades prof_ratings');
        // If there's no data, respond accordingly
        if (courseData.length === 0) {
            return res.status(404).json({ message: "No data fouvnd" });
        }
        // Map over the array of documents to format the response
        const responseData = courseData.map(course => ({
            courseName: course.courseName,
            description: course.description,
            generated_text: course.generated_text,
            grades: course.grades,
            prof_ratings: course.prof_ratings
        }));
        // Send the formatted response data
        res.json(responseData);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send({ message: "Internal Server Error" }); // Send a JSON response with the error message
    }

});

app.get('/:courseName/profRatings', async (req, res) => {
    try {
        // Find the course by its courseName - ensure the case matches the stored data
        const courseNameRegex = new RegExp('^' + req.params.courseName + '$', 'i');
        const course = await dataModel.findOne({ courseName: courseNameRegex }, 'prof_ratings');
        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Assuming the structure based on your screenshot, you should access just `prof_ratings`
        // Since `prof_ratings` itself is not a Map type, but its content is a Map.
        const ratings = {};
        console.log(course.prof_ratings)
        if (course.prof_ratings) {
            for (const [key, value] of Object.entries(course.prof_ratings)) {
                ratings[key] = value;
            }
        }
        
        res.json(course.prof_ratings); // Send the prof_ratings data
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(3001, () => {
    console.log('server is running')
})