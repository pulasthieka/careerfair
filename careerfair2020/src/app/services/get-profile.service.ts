import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(id): Observable<any> {
    return this.firestore
      .collection(environment.ApplicantCollection)
      .doc<Student>(id)
      .valueChanges();
  }
}
