import { Applicant } from './applicant.model';
// export type ApplicantToCompanuy = Applicant;
export interface Company {
  name: string;
  email?: string;
  applicants: Applicant[]; // subcollection of applicants
  panels: string[]; // panel identifiers
}
