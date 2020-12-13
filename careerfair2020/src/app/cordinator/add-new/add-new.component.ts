import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApplicantsService } from 'src/app/services/applicants.service';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements OnInit {
  newIndex = '';
  error = '';
  subscriptions: Subscription[] = [];
  @Input() applicants;
  @Input() company;
  constructor(
    private applicantService: ApplicantsService,
    private firestore: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  ngOnInit(): void {}

  addCandidate(): void {
    const index = this.newIndex.trim().toUpperCase();
    const selected = this.applicants.findIndex(
      (el) => el.applicant_id === index
    );
    if (index.match(/1[0-9]{5}[A-Z]/g)) {
      if (selected === -1) {
        this.subscriptions.push(
          this.applicantService.getProfile(index).subscribe(
            (res) => {
              if (res) {
                const applicant = {
                  applicant_id: index,
                  comment: '',
                  panel_id: '',
                  order: (this.applicants.length + 1).toString(),
                  resume_url: res.default_resume || '',
                  status: 'Interested',
                  uid: index,
                };

                this.firestore
                  .collection(environment.CompanyCollection)
                  .doc(this.company)
                  .collection('applicants')
                  .doc(index)
                  .set(applicant);
                this.error = 'Added';
                for (const subscription of this.subscriptions) {
                  subscription.unsubscribe();
                }
              } else {
                this.error = 'Index does not exist';
              }
            },
            (err) => {
              alert('Something went wrong');
            }
          )
        );
      } else {
        this.error = 'Already in List';
      }
    } else {
      this.error = 'Incorrect Index Format';
    }
    this.newIndex = '';
  }
}
