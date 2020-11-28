export interface Coordinator {
  panels: { panel_id: string }[]; // panel identifiers
  name: string; // identifier
  company?: string; // company identifier
  username?: string;
}
