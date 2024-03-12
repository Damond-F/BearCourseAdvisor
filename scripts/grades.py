import requests

def send_api_request(url):
    new_url = url

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad response status
        data = response.json()
        # Process the JSON data here
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except requests.exceptions.JSONDecodeError as json_err:
        print(f'JSON decoding error occurred: {json_err}')
    except Exception as err:
        print(f'An error occurred: {err}')
    
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        print("API request failed with status codee:", response.status_code)
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
    course_name = request.get("title")

    course_name = course_name.replace(" ", "")

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
    dict_grades["Average Course GPA"] = course_gpa
    dict_grades["Average Letter Grade"] = average_letter_grade
    dict_grades["Course Name"] = course_name

    return dict_grades

test = send_api_request("https://berkeleytime.com/api/grades/sections/431757&431758&437637&434845&424859&430685&427894&420093&419036&423044&413553&412545&411299&407070&406250&404155&401030&399457&386579&387361&381682&380541&357441&416813&384029&363581&380822&373749&349006&380858&381078&354270&375702&381820&371865&371866&370009&370010&366938/")
print(get_grade_distribution(test))