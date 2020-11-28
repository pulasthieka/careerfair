import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Panel } from '../models/panel.model';
import { Applicant } from '../models/applicant.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class PanelStatusService {
  constructor(private firestore: AngularFirestore) {}

  getPanelStatus(panel: string): Observable<any> {
    // get panel status as an observable
    // TODO - strict datatypes <Panel> for observables
    return this.firestore
      .collection(environment.PanelCollection)
      .doc(panel)
      .valueChanges();
  }

  updatePanelStatus(panel: string, status: boolean): void {
    // update panel availability in database
    this.firestore
      .collection<Panel>(environment.PanelCollection)
      .doc(panel)
      .update({
        available: status,
      });
  }
  updateSupport(panel: string, state: 'Requested' | 'Solved'): void {
    // update panel availability in database
    this.firestore
      .collection<Panel>(environment.PanelCollection)
      .doc(panel)
      .update({
        support: state,
      });
  }

  updateCurrentApplicant(panel: string, applicant: string): void {
    // update panel availability in database
    this.firestore
      .collection<Panel>(environment.PanelCollection)
      .doc(panel)
      .update({
        currentApplicant: applicant,
        // available: false,
      });
  }

  updateStart(panel: string, state: boolean): void {
    // update panel availability in database
    this.firestore
      .collection<Panel>(environment.PanelCollection)
      .doc(panel)
      .update({
        start: state,
      });
  }
  requestNext(panel: string, state: boolean): void {
    // update panel availability in database
    this.firestore
      .collection<Panel>(environment.PanelCollection)
      .doc(panel)
      .update({
        next: state,
      });
  }
}
