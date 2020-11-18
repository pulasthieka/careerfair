import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: AngularFirestore, private router: Router) {}

  checkWhetherFromPanel(username, pw) {
    this.firestore
      .collection(environment.PanelCollection, (ref) =>
        ref.where('username', '==', username)
      )
      .get()
      .subscribe((res) => {
        if (res.empty) {
          console.log('not from panel');
          this.checkWhetherACordinator(username, pw);
        } else {
          let panelData: any = res.docs[0].data();
          console.log('from panel');
          console.log('data', panelData);
          if (panelData.password == pw) {
            this.router.navigateByUrl('panel');
          } else {
            console.log('wrong pwd');
          }
        }
      });
  }

  checkWhetherACordinator(username, pw) {
    this.firestore
      .collection(environment.CoordinatorCollection, (ref) =>
        ref.where('username', '==', username)
      )
      .get()
      .subscribe((res) => {
        if (res.empty) {
          console.log('not a cordinator');
        } else {
          let cordData: any = res.docs[0].data();
          console.log('a cordinator');
          console.log('data', cordData);
          if (cordData.password == pw) {
            this.router.navigateByUrl('admin');
          } else {
            console.log('wrong pwd');
          }
        }
      });
  }
}
