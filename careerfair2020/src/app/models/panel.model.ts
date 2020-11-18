export interface Panel {
  applicants: {
    applicant_id: string;
    status: 'Not Interested' | 'Interviewed' | 'To Interview';
  }[];
  available: boolean;
  name: string;
}
