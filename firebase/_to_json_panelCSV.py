import csv
import json
studentFilePath = 'data/Panels.csv'
jsonFilePath = "data/panels.json"


outputJSON = []
with open(studentFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:

        panel = {}
        panel['uid'] = row['panel_name']
        panel['available'] = True
        panel['company'] = row['company_code']
        panel['companyName'] = row['company']
        panel['currentApplicant'] = ""
        panel['meetingLink'] = row['meetingLink']
        panel['name'] = row['panel_name']
        panel['next'] = False
        panel['start'] = False
        panel['support'] = 'Solved'
        panel['username'] = row['username']
        panel['password'] = row['password']

        outputJSON.append(panel)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
print(type(outputJSON))
