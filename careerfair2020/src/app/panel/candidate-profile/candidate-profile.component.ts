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
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit, OnDestroy, OnChanges {
  subscriptions: Subscription[] = [];
  profile: any;
  @Input() id;
  profileImage: any;
  constructor(
    private profileService: GetProfileService,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.id);
    if (changes.id.currentValue !== changes.id.previousValue) {
      console.log('updated Profile');
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
      const company = this.auth.user.company;
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
}
