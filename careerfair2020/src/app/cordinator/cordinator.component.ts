import { Component, OnDestroy, OnInit } from '@angular/core';
import { Panel } from '../models/panel.model';
import PanelClass from '../models/panel.model';
import { CoordinatorService } from '../services/coordinator.service';
import { PanelStatusService } from '../services/panel-status.service';
import { Subscription } from 'rxjs';
import { ApplicantsService } from '../services/applicants.service';
import { Applicant } from '../models/applicant.model';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
interface tableRow extends Applicant {
  statusB?: boolean;
  available?: boolean;
}
@Component({
  selector: 'app-cordinator',
  templateUrl: './cordinator.component.html',
  styleUrls: ['./cordinator.component.css'],
})
export class CordinatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panels: Panel[] = [];
  applicants: tableRow[] = [];
  coordinatorName = '';
  company = '';
  constructor(
    private panelService: PanelStatusService,
    private coordinator: CoordinatorService,
    private applicantService: ApplicantsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    // set coordinator name and subscribe to panel status updates
    this.coordinatorName = 'DialogCoordinator'; // TODO - get this from login credentials
    this.company = 'ADL';
    this.subscriptions.push(
      this.coordinator.getPanels(this.coordinatorName).subscribe((res) => {
        this.panels = [];
        res.panels.forEach((panel) => {
          this.panels.push(new PanelClass(panel));
        });
        this.getAllPanels();
        console.log(this.panels);
      })
    );
    this.getApplicants();
  }
  ngOnDestroy(): void {
    // remove subscriptions on exit
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  getAllPanels(): void {
    this.panels.forEach((panel) => {
      this.subscriptions.push(
        this.panelService.getPanelStatus(panel.name).subscribe((res) => {
          panel.available = res.available;
          panel.support = res.support;
          if (res.support === 'Requested') {
            alert(`${panel.name} needs help`);
          }
          panel.currentApplicant = res.currentApplicant;
        })
      );
    });
  }

  getApplicants(): void {
    this.subscriptions.push(
      this.applicantService.getApplicants(this.company).subscribe((res) => {
        const applicantIDs: tableRow[] = res.applicants;
        console.log(res);
        this.applicants = [];
        res.forEach((id) => {
          // map response to row
          this.subscriptions.push(
            this.firestore
              .collection(environment.ApplicantCollection)
              .doc<any>(id.applicant_id)
              .valueChanges()
              .subscribe((res2) => {
                const k = id as tableRow;
                if (k.status === 'Not Interested') {
                  k.statusB = true;
                }
                k.name = res2.name;
                k.available = res2.available;
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

  cancelSupport(panelName): void {
    this.panelService.updateSupport(panelName, 'Solved');
  }

  ChangeStatus(e, applicant): void {
    // console.log(e, applicant);
    if (e.target.checked) {
      // if checked and confirmed
      const confirmAction = confirm(
        `Do you want to label ${applicant} as Not Interested? \n Status like "Interviewed" will not be recoverable`
      );
      if (confirmAction) {
        this.applicantService.changeApplicantStatus(
          this.company,
          applicant,
          'Not Interested'
        );
      } else {
        // reset StatusB so that the checkbox is not ticked
        const selected = this.applicants.findIndex(
          (el) => el.applicant_id === applicant
        );
        if (selected !== -1) {
          this.applicants[selected].statusB = false;
        }
      }
    } else if (!e.target.checked) {
      this.applicantService.changeApplicantStatus(
        this.company,
        applicant,
        'Interested'
      );
    }
  }

  ChangePanel(applicant, panel): void {
    // console.log(applicant, panel);
    const selected = this.panels.find((el) => el.name === panel);
    if (selected && selected.available) {
      this.applicantService.changeApplicantPanel(
        this.company,
        applicant,
        panel
      );
      this.panelService.updateCurrentApplicant(panel, applicant);
      this.applicantService.changeApplicantAvailability(applicant, false);
    } else {
      alert(
        `Panel ${panel} is not free \nPlease ask ${panel} to end the previous interview`
      );
    }
  }
}
