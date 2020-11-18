import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coordinator } from '../models/coordinator.model';

@Injectable({
  providedIn: 'root',
})
export class CoordinatorService {
  coordinator = '';
  constructor(private firestore: AngularFirestore) {
    this.coordinator = 'DialogCoordinator';
  }

  getPanels(coordinator: string): Observable<any> {
    return this.firestore
      .collection(environment.CoordinatorCollection)
      .doc(coordinator)
      .valueChanges();
  }
}
