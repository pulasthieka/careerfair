class PanelClass {
  applicants: {
    applicant_id: string;
    status: 'Not Interested' | 'Interviewed' | 'To Interview';
  }[] = [];
  available = false;
  support: 'Requested' | 'Solved' = 'Solved';
  name = '';
  constructor(name: string) {
    this.name = name;
  }
}
export default PanelClass;
export interface Panel {
  applicants: {
    applicant_id: string;
    status: 'Not Interested' | 'Interviewed' | 'To Interview';
  }[];
  available: boolean;
  support: 'Requested' | 'Solved';
  name: string;
}
