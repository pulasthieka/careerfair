import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { ApplicantsService } from 'src/app/services/applicants.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Applicant } from '../../models/applicant.model';

interface tableRow {
  status: string;
  resume_url: string;
  panel_id: string;
  name?: string;
  applicant_id?: string;
  comment?: string;
}

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css'],
})
export class PanelTableComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  applicants: tableRow[] = [];
  company = '';
  constructor(
    private applicantService: ApplicantsService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.subscriptions.push(
      // TODO get the company name from Login service
      this.applicantService.getApplicants(this.company).subscribe((res) => {
        this.applicants = [];
        res.forEach((id: Applicant) => {
          this.subscriptions.push(
            this.firestore
              .collection(environment.ApplicantCollection)
              .doc(id.applicant_id)
              .valueChanges()
              .subscribe((res2: any) => {
                const k = id as tableRow;
                k.name = res2.name;
                const ref = this.storage.ref(
                  `${this.company}/${id.resume_url}`
                );
                this.subscriptions.push(
                  ref.getDownloadURL().subscribe((res3) => {
                    k.resume_url = res3;
                  })
                );
                const selected = this.applicants.findIndex(
                  (el) => el.applicant_id === id.applicant_id
                );
                if (selected !== -1) {
                  this.applicants[selected] = k;
                } else {
                  this.applicants.push(k);
                }
              })
          );
        });
      })
    );
  }
  ngOnDestroy(): void {
    // remove subscriptions on exit
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
