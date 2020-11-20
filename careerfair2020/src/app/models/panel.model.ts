class PanelClass {
  available = false;
  support: 'Requested' | 'Solved' = 'Solved';
  name = '';
  constructor(name: string) {
    this.name = name;
  }
}
export default PanelClass;

export interface Panel {
  available: boolean;
  support: 'Requested' | 'Solved';
  name: string;
  company?: string;
}
