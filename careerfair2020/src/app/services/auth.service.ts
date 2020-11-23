import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  public isLogeedIn: boolean | undefined;
  public loggedInMode: 'panel' | 'coord' | undefined | null | string;
  public errorMsg: string = '';
  public user: any | undefined;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.loggedInMode = localStorage.getItem('loggedInMode');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLogeedIn = true;
    } else {
      this.isLogeedIn = false;
    }
  }

  signInWithUsername(username, pwd) {
    this.fireAuth
      .signInWithEmailAndPassword(username, pwd)
      .then((res) => {
        this.errorMsg = '';
        this.checkWhetherFromPanel(username);
      })
      .catch((err) => {
        if (err.code == 'auth/invalid-email') {
          this.errorMsg = 'Invalid email address';
        } else if (err.code == 'auth/wrong-password') {
          this.errorMsg = 'Wrong Password';
        } else if (err.code == 'auth/user-not-found') {
          this.errorMsg = 'User does not exist';
        } else {
          this.errorMsg = 'Authentication error';
        }
        console.log(err.code);
      });
  }

  checkWhetherFromPanel(username) {
    this.firestore
      .collection(environment.PanelCollection, (ref) =>
        ref.where('username', '==', username)
      )
      .get()
      .subscribe((res) => {
        if (res.empty) {
          this.checkWhetherACordinator(username);
        } else {
          let panelData: any = res.docs[0].data();
          this.user = panelData;
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('loggedInMode', 'panel');
          this.router.navigateByUrl('panel');
        }
      });
  }

  checkWhetherACordinator(username) {
    this.firestore
      .collection(environment.CoordinatorCollection, (ref) =>
        ref.where('username', '==', username)
      )
      .get()
      .subscribe((res) => {
        if (res.empty) {
          this.errorMsg = 'User does not exist';
        } else {
          let cordData: any = res.docs[0].data();
          this.user = cordData;
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('loggedInMode', 'coord');
          this.router.navigateByUrl('admin');
        }
      });
  }

  logOut() {
    this.fireAuth.signOut();
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
