import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CordinatorComponent } from './cordinator/cordinator.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { TestComponent } from './test/test.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'panel',
    component: PanelComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'admin',
    component: CordinatorComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    // ONLY FOR TESTING
    path: 'test',
    component: TestComponent,
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
