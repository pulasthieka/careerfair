import { Component, OnDestroy, OnInit } from '@angular/core';
import { Panel } from '../models/panel.model';
import PanelClass from '../models/panel.model';
import { CoordinatorService } from '../services/coordinator.service';
import { PanelStatusService } from '../services/panel-status.service';
import { Subscription } from 'rxjs';
import { ApplicantsService } from '../services/applicants.service';
import { Applicant } from '../models/applicant.model';

@Component({
  selector: 'app-cordinator',
  templateUrl: './cordinator.component.html',
  styleUrls: ['./cordinator.component.css'],
})
export class CordinatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panels: Panel[] = [];
  applicants: Applicant[] = [];
  coordinatorName = '';
  company = '';
  constructor(
    private panelService: PanelStatusService,
    private coordinator: CoordinatorService,
    private applicantService: ApplicantsService
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
          panel.currentApplicant = res.currentApplicant;
        })
      );
    });
  }

  getApplicants(): void {
    this.subscriptions.push(
      this.applicantService.getApplicants(this.company).subscribe((res) => {
        const applicantIDs: Applicant[] = res.applicants;
        console.log(res);
        this.applicants = [];
        res.forEach((id) => {
          // map response to row
          const k = id as Applicant;
          k.name = 'name' + id.applicant_id;
          this.applicants.push(k);
        });
      })
    );
  }

  cancelSupport(panelName): void {
    this.panelService.updateSupport(panelName, 'Solved');
  }

  ChangeStatus(applicant, status): void {
    this.applicantService.changeApplicantStatus(
      this.company,
      applicant,
      status
    );
  }

  ChangePanel(applicant, panel): void {
    console.log(applicant, panel);
    let selected = this.panels.find((el) => {
      el.name === panel;
    });
    if (selected && selected.available) {
      this.applicantService.changeApplicantPanel(
        this.company,
        applicant,
        panel
      );
      this.panelService.updateCurrentApplicant(panel, applicant);
    } else {
      alert(
        `Panel ${panel} is not free \nPlease ask ${panel} to end the previous interview`
      );
    }
  }
}
