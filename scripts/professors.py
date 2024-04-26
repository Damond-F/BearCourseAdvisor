import ratemyprofessor
import pymongo
from dotenv import load_dotenv
import os
import certifi

load_dotenv()
mongoPW = os.getenv('MONGO_PW')
client = pymongo.MongoClient(f'mongodb+srv://BearCourseAdivsor:{mongoPW}@cluster0.7jj4shw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', tlsCAFile=certifi.where())

db = client['classes']
cs = db['cs']


def importProfessorRatings(profs):
    # professor ex: Satish Rao
    res = {}
    for prof in profs:
        professorObject = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California, Berkeley"), prof)

        if professorObject is not None:
            rating = "Rating: %s / 5.0" % professorObject.rating
            difficulty = "Difficulty: %s / 5.0" % professorObject.difficulty
            if professorObject.would_take_again is not None:
                takeAgain = ("Would Take Again: %s" % round(professorObject.would_take_again, 1)) + '%'
            else:
                takeAgain = "N/A"
    
        prof_rating = {
            "professor": prof,
            "rating": rating,
            "difficulty": difficulty,
            "takeAgain": takeAgain
        }
        
        res[prof] = prof_rating

    return res

profs = ["Sylvia Ratnasamy", "Rob Shakir"]
course = "COMPSCI168"

cs.update_one(
        { "Course Name": course},
        { "$set": {'prof ratings': importProfessorRatings(profs)}}
    )


# cs.update_one(
#         { "Course Name": "COMPSCI168"},
#         { "$set": {'prof ratings': {
#             "professor": "Sylvia Ratnasamy",
#             "rating": 'N/A',
#             'difficulty': 'N/A',
#             'takeAgain': 'N/A'
#         }}}
#     )




    # return {
    #     'ratingScore': rating,
    #     'difficultyScore': difficulty,
    #     'takeAgainPercentage': takeAgain 
    # }

