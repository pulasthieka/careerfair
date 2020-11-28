# Data preparation

Create csv files that have the following formats.

```
csvdata
|   Applicant.csv (format of file specified in company.applicants)
|   |__index,
|   |__path_to_cv,
|
|   CompanyData.csv
|   |__name,
|   |__company_code,
|   |__email,
|   |__applicants, (path to filename containing applicants)
|   |__panels (delimited by commas)
|
|   CoordData.csv
|   |__company_code,
|   |__name,
|   |__meetingLink,
|   |__username,
|   |__password,
|   |__panels (delimited by commas)
|
|   PanelData.csv
|   |__company,
|   |__company_code,
|   |__panel_no,
|   |__panel_name,
|   |__meetingLink,
|   |__username,
|   |__password
|
|   StudentData.csv
|   |__index,
|   |__contact,
|   |__path_to_image,
|   |__address,
|   |__email,
|   |__interested,
|   |__profile,
|   |__firstName,
|   |__lastName,
|   |__path_to_cv,
|...
```

Use the `_to_json_**.py` scripts to convert these to .json files. The scripts add a few default values that are used in the web application.

```
company {}
|__company['uid'] = row['company_code']
|__company['email'] = row['email']
|__company['name'] = row['name']
|__company['panels'] = row['panels'].split(",")
|__randInt = random.randrange(0, 115, 1)
|__company['applicants'] = [applicant = {}
|                             |__applicant['uid'] = row['index']
|                             |__applicant['applicant_id'] = row['index']
|                             |__applicant['comment'] = ""
|                             |__applicant['panel_id'] = ""
|                             |__applicant['resume_url'] = row['path_to_cv']
|                             |__applicant['status'] = 'Interested'
|                            ]...
|

coord = {}
|__coord['uid'] = row['name']
|__coord['company'] = row['company_code']
|__coord['meetingLink'] = row['meetingLink']
|__coord['name'] = row['name']
|__coord['panels'] = row['panels'].split(",")
|__coord['username'] = row['username']
|__coord['password'] = row['password']

panel = {}
|__panel['uid'] = row['panel_name']
|__panel['available'] = True
|__panel['company'] = row['company_code']
|__panel['currentApplicant'] = ""
|__panel['meetingLink'] = row['meetingLink']
|__panel['name'] = row['company']
|__panel['next'] = False
|__panel['start'] = False
|__panel['support'] = 'Solved'
|__panel['username'] = row['username']
|__panel['password'] = row['password']

student = {}
|__student['uid'] = row['index']
|__student['address'] = row['address']
|__student['available'] = True
|__student['default_resume'] = row['path_to_cv']
|__student['email'] = row['email']
|__student['index'] = row['index']
|__student['interests'] = row['interested'].split(",")
|__student['mobile'] = row['contact']
|__student['name'] = row['firstName'] + " " + row['lastName']
|__student['photo'] = row['path_to_image']
|__student['profile'] = row['profile']
```
