import requests

def send_api_request(url):
    new_url = url

    response = requests.get(new_url)

    if response.status.code == 200:
        response_json = response.json()
        return response_json
    else:
        print ("API request failed with status code:", response.status_code)
        return None

def retrieve_request():
    if __name__ == '__main__':
        api_response = send_api_request() 
        if api_response: 
            return api_response
        else: 
            print("failed to retrieve API response.")

def get_grade_distribution(request):
    course_gpa = request.get("course_gpa")
    average_letter_grade = request.get("course_letter")
    course_name = "CS61A"

    a_plus = request.get("A+").get("percent")
    a = request.get("A").get("percent")
    a_minus = request.get("A-").get("percent")
    b_plus = request.get("B+").get("percent")
    b = request.get("B").get("percent")
    b_minus = request.get("B-").get("percent")
    c_plus = request.get("C+").get("percent")
    c = request.get("C").get("percent")
    c_minus = request.get("C-").get("percent")
    d = request.get("D").get("percent")
    f = request.get("F").get("percent")
    p = request.get("P").get("percent")
    np = request.get("NP").get("percent")

    dict_grades = {}
    dict_grades["A+"] = a_plus
    dict_grades["A"] = a
    dict_grades["A-"] = a_minus
    dict_grades["B+"] = b_plus
    dict_grades["B"] = b
    dict_grades["B-"] = b_minus
    dict_grades["C+"] = c_plus
    dict_grades["C"] = c
    dict_grades["C-"] = c_minus
    dict_grades["D"] = d
    dict_grades["f"] = f
    dict_grades["P"] = p
    dict_grades["NP"] = np
    dict_grades["course_gpa"] = course_gpa
    dict_grades["average_letter_grade"] = average_letter_grade
    dict_grades["course_name"] = course_name

    return dict_grades
