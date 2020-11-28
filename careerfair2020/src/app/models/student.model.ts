export interface Student {
  address: string;
  available?: boolean;
  default_resume: string; // relative to root
  email: string;
  index: string;
  interests: string[];
  mobile: string;
  name: string;
  photo: string; // relative to root
  profile: string;
}
