import { Applicant } from './applicant.model';
// export type ApplicantToCompanuy = Applicant;
export interface Company {
  applicants: Applicant[]; // subcollection of applicants
  email?: string;
  name: string;
  panels: string[]; // panel identifiers
}
