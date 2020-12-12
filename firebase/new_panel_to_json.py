import csv
import json

#Make a new csv named data/new/new_panels.csv, and input the new panels into that in the same format 
#as the Panels.csv file (Do not repeat already existing panels) (Edit example file)
#Remember to create a unique username and password
#Run this code
#Run addPanelToFirebase.js

studentFilePath = 'data/new/new_panels.csv'
jsonFilePath = "data/new/new_panels.json"

new_panel_dict = {}
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

        if row['company_code'] not in new_panel_dict:
            new_panel_dict[row['company_code']] = [row['panel_name']]
        else:
            new_panel_dict[row['company_code']].append(row['panel_name'])
        print ("adding panels:", panel['company'], panel['name'])
        outputJSON.append(panel)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
print(type(outputJSON))


studentFilePath = 'data/CoordinatorList.csv'
jsonFilePath = "data/new/new_coordinators.json"


outputJSON_coord = []
with open(studentFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        if row['company_code'] in new_panel_dict:
            coord = {}
            coord['uid'] = row['name']
            coord['company'] = row['company_code']
            coord['meetingLink'] = row['meetingLink']
            coord['name'] = row['name']
            coord['panels'] = row['panels'].split(",")
            coord['panels'].extend(new_panel_dict[row['company_code']])
            coord['username'] = row['username']
            # coord['password'] = row['password']
            print ("adding coordinator panels:", coord['company'], coord['panels'])
            outputJSON_coord.append(coord)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON_coord, indent=4))
print(type(outputJSON_coord))

companyFilePath = 'data/Companies.csv'

jsonFilePath = "data//new/new_companies.json"


outputJSON_company = []
with open(companyFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        if row['company_code'] in new_panel_dict:
            company = {}
            company['uid'] = row['company_code']
            company['email'] = row['email']
            company['name'] = row['name']
            company['panels'] = row['panels'].split(",")
            company['panels'].extend(new_panel_dict[row['company_code']])
            company['applicants'] = []
            print ("adding company panels:", company['uid'], company['panels'])
            outputJSON_company.append(company)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON_company, indent=4))
