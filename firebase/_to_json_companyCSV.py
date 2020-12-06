import csv
import json
import random
companyFilePath = 'data/CompanyData.csv'
jsonFilePath = "data/companies.json"


def getApplicants(studentFilePath):
    applicantsList = []
    with open(studentFilePath) as csvFile:
        csvReader = csv.DictReader(csvFile)
        i = 0
        for row in csvReader:
            applicant = {}
            applicant['uid'] = row['index']
            applicant['applicant_id'] = row['index']
            applicant['comment'] = ""
            applicant['panel_id'] = ""
            applicant['order'] = 115-i  # row['order']
            applicant['resume_url'] = row['path_to_cv']
            applicant['status'] = 'Interested'
            applicantsList.append(applicant)
            i += 1
    randInt = random.randrange(0, 115, 1)
    return applicantsList[randInt:randInt+10]


outputJSON = []
with open(companyFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        company = {}
        company['uid'] = row['company_code']
        company['email'] = row['email']
        company['name'] = row['name']
        company['panels'] = row['panels'].split(",")
        company['applicants'] = getApplicants('data/'+row['applicants'])
        outputJSON.append(company)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
