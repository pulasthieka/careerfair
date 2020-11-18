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
<<<<<<< HEAD
import { TableComponent } from './table/table.component';
=======
import { CandidateProfileComponent } from './panel/candidate-profile/candidate-profile.component';
import { TestComponent } from './test/test.component';
>>>>>>> 774f28ca598bfe43eda0041551e67bfbf5797653



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CordinatorComponent,
    PanelComponent,
<<<<<<< HEAD
    TableComponent,
=======
    CandidateProfileComponent,
    TestComponent,
>>>>>>> 774f28ca598bfe43eda0041551e67bfbf5797653
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
