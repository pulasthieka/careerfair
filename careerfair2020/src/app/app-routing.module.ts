import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CordinatorComponent } from './cordinator/cordinator.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'admin', component: CordinatorComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
