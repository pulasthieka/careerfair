import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import data from '../../assets/applicants';
import { Applicant } from '../models/applicant.model';
import { Company } from '../models/company.model';
@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  company = 'ADL';
  applicants: Applicant[] = [];
  constructor(private firestore: AngularFirestore) {}

  getApplicants(): Observable<Company> {
    return this.firestore
      .collection(environment.CompanyCollection)
      .doc<any>(this.company)
      .valueChanges();
  }
}
