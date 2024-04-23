from flask import render_template
from app import app 
@app.route('/')
@app.route('/home')
def index():
    user = {'username': 'Oski'}
    classes = [
        {
        'course': {'code': 'CS61A'}, 
        'description': "Structure and Interpretation of Computer Programs"
        },
        {
        'course': {'code': 'CS61B'}, 
        'description':  "Data Structures and Algorithms"
        }
    ]
    return render_template('index.html', title = 'BearCourseAdvisor', user = user, classes = classes)

    return "Welcome to BearCourseAdvisor!"