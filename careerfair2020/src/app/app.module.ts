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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CandidateProfileComponent } from './panel/candidate-profile/candidate-profile.component';
import { PanelTableComponent } from './panel/panel-table/panel-table.component';
import { FormsModule } from '@angular/forms';
import { AddNewComponent } from './cordinator/add-new/add-new.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PromptDialogComponent } from './modals/prompt-dialog/prompt-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CordinatorComponent,
    PanelComponent,
    CandidateProfileComponent,
    PanelTableComponent,
    AddNewComponent,
    SpinnerOverlayComponent,
    SpinnerComponent,
    PromptDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    OverlayModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerOverlayComponent,PromptDialogComponent],
})
export class AppModule {
  constructor() {}
}
