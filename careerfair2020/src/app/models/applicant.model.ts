export interface Applicant {
  applicant_id: string;
  status: 'Not Interested' | 'Interviewed' | 'To Interview' | 'Hired';
  resume_url: string;
  panel_id: string;
}
