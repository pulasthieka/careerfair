import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CordinatorComponent } from './cordinator/cordinator.component';
import { PanelComponent } from './panel/panel.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { DataEntryService } from './services/data-entry.service';
import { CandidateProfileComponent } from './panel/candidate-profile/candidate-profile.component';
import { TestComponent } from './test/test.component';
import { PanelTableComponent } from './panel/panel-table/panel-table.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CordinatorComponent,
    PanelComponent,
    CandidateProfileComponent,
    TestComponent,
    PanelTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private dataentry: DataEntryService) {}
}
