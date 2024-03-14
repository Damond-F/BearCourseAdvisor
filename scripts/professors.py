import ratemyprofessor
import pymongo
from dotenv import load_dotenv
import os

def importProfessorRatings(professor):
    # professor ex: Satish Rao

    professorObject = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California, Berkeley"), professor)

    if professorObject is not None:
        rating = "Rating: %s / 5.0" % professorObject.rating
        difficulty = "Difficulty: %s / 5.0" % professorObject.difficulty
        if professorObject.would_take_again is not None:
            takeAgain = ("Would Take Again: %s" % round(professorObject.would_take_again, 1)) + '%'
        else:
            takeAgain = "Would Take Again: N/A"
    

    load_dotenv()
    mongoConnection = os.getenv('MONGO_CONNECTION')
    client = pymongo.MongoClient(mongoConnection)



    # return {
    #     'ratingScore': rating,
    #     'difficultyScore': difficulty,
    #     'takeAgainPercentage': takeAgain 
    # }

