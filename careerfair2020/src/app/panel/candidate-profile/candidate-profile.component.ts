import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { GetProfileService } from 'src/app/services/get-profile.service';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit {
  profile: any;
  profileImage: any;
  constructor(
    private profileService: GetProfileService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile('160616B').subscribe((res) => {
      this.profile = res as Student;
      const ref = this.storage.ref(`profilepics/${this.profile.photo}`);
      ref.getDownloadURL().subscribe((res) => {
        this.profileImage = res;
      });
      console.log(this.profileImage, this.profile);
    });
  }
}
