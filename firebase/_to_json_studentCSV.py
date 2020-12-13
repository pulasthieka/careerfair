import csv
import json
studentFilePath = 'data/Students.csv'
jsonFilePath = "data/students.json"


outputJSON = []
with open(studentFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:

        student = {}
        student['uid'] = row['index']
        student['address'] = row['address']
        student['available'] = True
        student['default_resume'] = row['path_to_cv']
        student['email'] = row['email']
        student['index'] = row['index']
        student['interests'] = row['interested'].split(",")
        student['mobile'] = row['contact']
        student['name'] = row['firstName'] + " " + row['lastName']
        student['photo'] = row['path_to_image']
        student['profile'] = row['profile']

        outputJSON.append(student)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
print(type(outputJSON))
