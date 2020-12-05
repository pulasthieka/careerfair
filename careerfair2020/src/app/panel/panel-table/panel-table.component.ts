import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { ApplicantsService } from 'src/app/services/applicants.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Applicant } from '../../models/applicant.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface tableRow extends Applicant {
  resume_url: string;
  profileImage: string;
  name?: string;
}

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['../panel.component.css', './panel-table.component.css'],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-1000px)', opacity: 0 }),
        animate(
          '2s ease-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0px)', opacity: 1 }),
        animate(
          '2s ease-in',
          style({ transform: 'translateX(-1000px)', opacity: 0 })
        ),
      ]),
    ]),
  ],
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
        res.forEach((id: Applicant) => {
          this.subscriptions.push(
            this.firestore
              .collection(environment.ApplicantCollection)
              .doc(id.applicant_id)
              .valueChanges()
              .subscribe((res2: any) => {
                const k = id as tableRow;
                k.name = res2.name;

                const selected = this.applicants.findIndex(
                  (el) => el.applicant_id === id.applicant_id
                );
                if (selected !== -1) {
                  this.applicants[selected].status = k.status;
                  this.applicants[selected].panel_id = k.panel_id;
                  this.applicants[selected].comment = k.comment;
                } else {
                  const ref = this.storage.ref(id.resume_url);
                  this.subscriptions.push(
                    ref.getDownloadURL().subscribe((res3) => {
                      k.resume_url = res3;
                    })
                  );
                  const refimg = this.storage.ref(res2.photo);
                  this.subscriptions.push(
                    refimg.getDownloadURL().subscribe((res3) => {
                      k.profileImage = res3;
                    })
                  );
                  this.applicants.push(k);
                  this.applicants.sort((a, b) => a.order - b.order);
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
