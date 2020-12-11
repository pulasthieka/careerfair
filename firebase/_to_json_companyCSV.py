import csv
import json
import random
companyFilePath = 'data/CompanyData.csv'

jsonFilePath = "data/companiesTest.json"


def getApplicants(studentFilePath):
    applicantsList = []
    with open(studentFilePath) as csvFile:
        csvReader = csv.DictReader(csvFile)
        i = 0
        for row in csvReader:
            applicant = {}
            if row['applicant_id'] != "":
                applicant['uid'] = row['applicant_id']
                applicant['applicant_id'] = row['applicant_id']
                applicant['comment'] = " "
                applicant['panel_id'] = ""
                applicant['order'] = row['order']
                applicant['resume_url'] = row['resume_url']
                applicant['status'] = 'Interested'
                applicantsList.append(applicant)
            # i += 1
    # randInt = random.randrange(0, 115, 1)
    return applicantsList


outputJSON = []
with open(companyFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        company = {}
        company['uid'] = row['company_code']
        company['email'] = row['email']
        company['name'] = row['name']
        company['panels'] = row['panels'].split(",")
        company['applicants'] = getApplicants(
            'E:/Projects/University/Career Fair 2020/career fair interviews/applicants details/'+row['applicants'])
        # company['applicants'] = getApplicants('data/ProfileData.csv')
        outputJSON.append(company)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
