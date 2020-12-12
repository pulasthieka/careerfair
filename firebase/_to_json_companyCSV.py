import csv
import json
import random
companyFilePath = 'data/Companies.csv'

jsonFilePath = "data/companies.json"


def getApplicants(studentFilePath):
    applicantsList = []
    try:
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
    except:
        pass
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
        company['applicants'] = getApplicants('data/company_data/'+row['applicants'])
        outputJSON.append(company)

with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(outputJSON, indent=4))
