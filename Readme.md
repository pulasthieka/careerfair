# Folder Structure

- Use `careerfair2020` folder for the angular application
- Use `firebase` folder to backup firebase scripts, rules etc.

# Startup Procedure

## For Development

1. Clone repo `git clone https://github.com/pulasthieka/careerfair.git`
2. Navigate to the Angular application folder `cd careerfair2020`
3. Install necessary packages `npm install`
4. Run application in developer mode `ng serve`

## For Production

1. Navigate to the Angular application folder `cd careerfair2020`
2. Install necessary packages `npm install`
3. Update firebase variables for production [here](careerfair2020/src/environments/environment.prod.ts)
4. Build the application for deployment `ng build -prod`

# Data Formats

### Company Data Structure

- name: string;
- email?: string;
- panels: string[];
- applicants: SubCollection;

  #### Applicant structure

  - applicant_id: string;
  - status: 'Not Interested' | 'Interviewed' | 'To Interview' | 'Hired';
  - resume_url: string;
  - panel_id: string;

### Panel Data Structure

- available: boolean;
- support: 'Requested' | 'Solved';
- name: string;
- company?: string; (optional)

### Student Data Structure

- index: string;
- email: string;
- name: string;
- mobile: string;
- address: string;
- interests: string[];
- profile: string;
- photo: string;
- available?: string;
