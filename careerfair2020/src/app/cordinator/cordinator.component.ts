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
import { AuthService } from '../services/auth.service';
interface tableRow extends Applicant {
  statusB?: boolean;
  available?: boolean;
  name: string;
  interviewed_by_panel_id?: string;
}
@Component({
  selector: 'app-cordinator',
  templateUrl: './cordinator.component.html',
  styleUrls: ['./cordinator.component.css', '../app.component.css'],
})
export class CordinatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panels: Panel[] = [];
  applicants: tableRow[] = [];
  coordinatorName = '';
  company = '';
  meetingLink = '';

  constructor(
    private panelService: PanelStatusService,
    private coordinator: CoordinatorService,
    private applicantService: ApplicantsService,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    // console.log('from local storage ', this.authService.user);
    // console.log('from local storage ', this.authService.isLogeedIn);
    // console.log('from local storage ', this.authService.loggedInMode);
  }

  ngOnInit(): void {
    // set coordinator name and subscribe to panel status updates
    this.coordinatorName = this.authService.user.name;
    this.company = this.authService.user.company;
    this.subscriptions.push(
      this.coordinator.getPanels(this.coordinatorName).subscribe((res) => {
        this.panels = [];
        res.panels.forEach((panel) => {
          this.panels.push(new PanelClass(panel));
          this.meetingLink = panel.meetingLink;
        });
        this.getAllPanels();
        // console.log(this.panels);
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
          panel.start = res.start;
          panel.next = res.next;
          panel.done = false;
          if (res.support === 'Requested') {
            alert(`${panel.name} needs help`);
          }
          if (res.next) {
            alert(`Send a new applicant to ${panel.name}`);
          }
          panel.currentApplicant = res.currentApplicant;
        })
      );
    });
  }

  getApplicants(): void {
    this.subscriptions.push(
      this.applicantService.getApplicants(this.company).subscribe((res) => {
        // const applicantIDs: tableRow[] = res.applicants;
        // console.log(res);
        this.applicants = [];
        res.forEach((id) => {
          // console.log(id.uid, id.panel_id);
          const k = id as tableRow;
          // console.log(id.panel_id);
          k.interviewed_by_panel_id = id.panel_id;
          // console.log(k.interviewed_by_panel_id, id.panel_id, k.panel_id);
          // map response to row
          this.subscriptions.push(
            this.firestore
              .collection(environment.ApplicantCollection)
              .doc(id.applicant_id)
              .valueChanges()
              .subscribe((res2: any) => {
                if (k.status === 'Not Interested') {
                  k.statusB = true;
                }
                // console.log('applicantDB', res2.name);
                k.name = res2.name;
                k.available = res2.available;
                const selected = this.applicants.findIndex(
                  (el) => el.applicant_id === id.applicant_id
                );
                if (selected !== -1) {
                  this.applicants[selected] = k;
                } else {
                  this.applicants.push(k);
                  this.applicants.sort((a, b) => a.order - b.order);
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
    console.log(selected);
    if (selected && selected.available) {
      const selected = this.applicants.findIndex(
        (el) => el.applicant_id === applicant
      );
      console.log(this.applicants[selected]);
      if (selected !== -1 && !this.applicants[selected].available) {
        const confirmSend = confirm(
          `This applicant is in another interview. Are you sure you want to send this information to the panel`
        );
        if (!confirmSend) {
          return;
        }
      } else if (selected === -1) {
        return;
      }
      this.panelService.requestNext(panel, false);
      this.panelService.updatePanelStatus(panel, false);
      this.applicantService.changeApplicantPanel(
        this.company,
        applicant,
        panel
      );
      this.panelService.updateCurrentApplicant(panel, applicant);
      this.applicantService.changeApplicantAvailability(applicant, false);
      console.log(this.applicants[selected]);
    } else if (!selected) {
      alert(`Please assign a Panel`);
    } else {
      alert(
        `Panel ${panel} is not free \nPlease ask ${panel} to end the previous interview`
      );
    }
  }

  onClickLogout(): void {
    this.authService.logOut();
  }
}
