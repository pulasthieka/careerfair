import csv
import json
import random
companyFilePath = 'E:/Projects/University/Career Fair 2020//WebApplication/firebase/CompanyData.csv'
jsonFilePath = "E:/Projects/University/Career Fair 2020/WebApplication/firebase/companies.json"

studentFilePath = 'E:/Projects/University/Career Fair 2020//WebApplication/firebase/ProfileData.csv'

applicantsList = []
with open(studentFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        applicant = {}
        applicant['uid'] = row['index']
        applicant['applicant_id'] = row['index']
        applicant['comment'] = ""
        applicant['panel_id'] = ""
        applicant['resume_url'] = row['path_to_cv']
        applicant['status'] = 'Interested'
        applicantsList.append(applicant)


outputJSON = []
with open(companyFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:

        company = {}
        company['uid'] = row['company_code']
        company['email'] = row['email']
        company['name'] = row['name']
        company['panels'] = row['panels'].split(",")
        randInt = random.randrange(0, 115, 1)
        company['applicants'] = applicantsList[randInt:min(randInt+10, 115)]

        outputJSON.append(company)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
print(type(outputJSON))
