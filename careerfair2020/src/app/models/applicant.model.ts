export interface Applicant {
  applicant_id: string; // identifier
  status: 'Not Interested' | 'Interviewed' | 'To Interview' | 'Hired';
  resume_url: string; // relative to root
  panel_id: string; // interviewed panel identifier
  comment?: string;
}
