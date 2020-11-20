import { Applicant } from './applicant.model';
// export type ApplicantToCompanuy = Applicant;
export interface Company {
  name: string;
  email?: string;
  applicants: Applicant[];
  panels: string[];
}
