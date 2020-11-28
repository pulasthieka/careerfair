export interface Student {
  index: string;
  email: string;
  name: string;
  mobile: string;
  address: string;
  interests: string[];
  profile: string;
  photo: string; // relative to root
  available?: boolean;
  default_resume: string; // relative to root
}
