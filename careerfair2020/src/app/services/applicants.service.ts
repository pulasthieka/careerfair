import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  constructor(private firestore: AngularFirestore) {}

  getApplicants(company): Observable<any> {
    return this.firestore
      .collection(environment.CompanyCollection)
      .doc(company)
      .collection('applicants')
      .valueChanges();
  }

  changeApplicantStatus(company, applicant: string, statusNew: string): void {
    this.firestore
      .collection(environment.CompanyCollection)
      .doc(company)
      .collection('applicants')
      .doc(applicant)
      .update({
        status: statusNew,
      });
  }

  changeApplicantPanel(company, applicant: string, statusNew: string): void {
    this.firestore
      .collection(environment.CompanyCollection)
      .doc(company)
      .collection('applicants')
      .doc(applicant)
      .update({
        panel_id: statusNew,
      });
  }

  changeApplicantAvailability(applicant: string, statusNew: boolean): void {
    this.firestore
      .collection(environment.ApplicantCollection)
      .doc(applicant)
      .update({
        available: statusNew,
      });
  }
  getComments(company: string, applicant: string): Observable<any> {
    return this.firestore
      .collection(environment.CompanyCollection)
      .doc(company)
      .collection('applicants')
      .doc(applicant)
      .valueChanges();
  }
  updateComments(company: string, applicant: string, comments: string): void {
    this.firestore
      .collection(environment.CompanyCollection)
      .doc(company)
      .collection('applicants')
      .doc(applicant)
      .update({
        comment: comments,
      });
  }
  getProfile(id): Observable<any> {
    return this.firestore
      .collection(environment.ApplicantCollection)
      .doc(id)
      .valueChanges();
  }
}
