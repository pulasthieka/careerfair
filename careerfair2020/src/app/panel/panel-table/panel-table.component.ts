import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from 'src/app/models/student.model';
import { ApplicantsService } from 'src/app/services/applicants.service';
import { environment } from 'src/environments/environment';
import { Applicant } from '../../models/applicant.model';

interface tableRow {
  status: string;
  resume_url: string;
  panel_id: string;
  name?: string;
}

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css'],
})
export class PanelTableComponent implements OnInit {
  applicants: tableRow[] = [];

  constructor(
    private applicantService: ApplicantsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.applicantService.getApplicants().subscribe((res) => {
      const applicantIDs: Applicant[] = res.applicants;
      console.log(applicantIDs);
      this.applicants = [];
      applicantIDs.forEach((id) => {
        this.firestore
          .collection(environment.ApplicantCollection)
          .doc<any>(id.applicant_id)
          .valueChanges()
          .subscribe((res2) => {
            const k = id as tableRow;
            k.name = res2.name;
            this.applicants.push(k);
          });
      });
    });
  }
}
