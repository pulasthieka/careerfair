import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { GetProfileService } from 'src/app/services/get-profile.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { PanelStatusService } from 'src/app/services/panel-status.service';
import { ApplicantsService } from 'src/app/services/applicants.service';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['../panel.component.css', './candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit, OnDestroy, OnChanges {
  subscriptions: Subscription[] = [];
  profile: any;
  started = false;
  @Input() comments;
  @Input() panelName;
  @Input() company;
  @Input() id;
  profileImage: any;
  constructor(
    private profileService: GetProfileService,
    private storage: AngularFireStorage,
    private panelStatus: PanelStatusService,
    private applicantService: ApplicantsService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.id);
    if (changes.id.currentValue !== changes.id.previousValue) {
      // console.log('updated Current Applicant');
      this.getProfile();
    }
  }

  ngOnDestroy(): void {
    // remove subscriptions on exit
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getProfile(): void {
    if (this.id.length >= 5) {
      this.subscriptions.push(
        this.panelStatus.getPanelStatus(this.panelName).subscribe((res) => {
          this.started = res.start;
        })
      );
      this.subscriptions.push(
        this.applicantService
          .getComments(this.company, this.id)
          .subscribe((res) => {
            this.comments = res.comment;
          })
      );
      this.subscriptions.push(
        this.profileService.getProfile(this.id).subscribe((res) => {
          this.profileImage =
            '../assets/default-profile-picture/default-profile-picture.jpg';
          this.profile = res as Student;
          const refcv = this.storage.ref(this.profile.default_resume);
          refcv.getDownloadURL().subscribe((res3) => {
            this.profile.default_resume = res3;
          });
          const ref = this.storage.ref(this.profile.photo);
          this.subscriptions.push(
            ref.getDownloadURL().subscribe((res2) => {
              this.profileImage = res2;
            })
          );
          // console.log(this.profileImage, this.profile);
        })
      );
    }
  }
  startInterview(): void {
    // update panel availability in database
    this.panelStatus.updateStart(this.panelName, true);
    this.panelStatus.updatePanelStatus(this.panelName, false);
    this.panelStatus.requestNext(this.panelName, false);
    this.applicantService.changeApplicantAvailability(this.id, false);
  }
  endInterview(): void {
    this.panelStatus.updateCurrentApplicant(this.panelName, '');
    this.panelStatus.updatePanelStatus(this.panelName, true);
    this.panelStatus.updateStart(this.panelName, false);
    this.applicantService.changeApplicantAvailability(this.id, true);
    this.updateComments();
  }
  updateComments(): void {
    this.applicantService.updateComments(this.company, this.id, this.comments);
  }
}
