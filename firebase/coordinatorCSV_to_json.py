import csv
import json
studentFilePath = 'E:/Projects/University/Career Fair 2020//WebApplication/firebase/CoordData.csv'
jsonFilePath = "E:/Projects/University/Career Fair 2020/WebApplication/firebase/coordinator.json"


outputJSON = []
with open(studentFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:

        coord = {}
        coord['uid'] = row['name']
        coord['company'] = row['company_code']
        coord['meetingLink'] = row['meetingLink']
        coord['name'] = row['name']
        coord['panels'] = row['panels'].split(",")
        coord['username'] = row['username']
        coord['password'] = row['password']

        outputJSON.append(coord)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
print(type(outputJSON))
