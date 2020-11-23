import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {
    // you can access the following variables using this.authService object

    // this.authService.isLogeedIn: boolean | undefined;
    // this.authService.loggedInMode: 'panel' | 'coord' | undefined;
    // this.authService.errorMsg: string = '';
    // this.authService.user: any | undefined;

  }

  ngOnInit(): void {}

  onLoginSubmit(values): void {
    this.authService.signInWithUsername(values.username, values.password);
  }
}
