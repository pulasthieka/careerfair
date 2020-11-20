# Folder Structure

- Use `careerfair2020` folder for the angular application
- Use `firebase` folder to backup firebase scripts, rules etc.

# Data Formats

### Company Data Structure

name: string;
email?: string;
applicants: Applicant[];
panels: string[];

### Applicant structure

applicant_id: string;
status: 'Not Interested' | 'Interviewed' | 'To Interview' | 'Hired';
resume_url: string;
panel_id: string;

### Panel Data Structure

available: boolean;
support: 'Requested' | 'Solved';
name: string;
company?: string; (optional)

### Student Data Structure

index: string;
email: string;
name: string;
mobile: string;
address: string;
interests: string[];
profile: string;
photo: string;
status?: string;
