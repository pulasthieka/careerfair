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
  start?: boolean;
  next: boolean;
  support: 'Requested' | 'Solved';
  name: string;
  company?: string;
  currentApplicant?: string;
}
