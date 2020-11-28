export interface Applicant {
  applicant_id: string; // identifier
  comment?: string;
  panel_id: string; // interviewed panel identifier
  resume_url: string; // relative to root
  status: 'Not Interested' | 'Interviewed' | 'To Interview' | 'Hired';
}
