class PanelClass {
  available = false;
  support: 'Requested' | 'Solved' = 'Solved';
  name = '';
  start = false;
  next = false;
  constructor(name: string) {
    this.name = name;
  }
}
export default PanelClass;

export interface Panel {
  available: boolean;
  company?: string; // identifier of company
  currentApplicant?: string; // index number of applicant
  meetingLink?: string;
  name: string;
  next: boolean;
  start?: boolean;
  support: 'Requested' | 'Solved';
  username?: string;
  done?: boolean;
}
