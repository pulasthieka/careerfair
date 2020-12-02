import { Component, OnDestroy, OnInit } from '@angular/core';
import { PanelStatusService } from '../services/panel-status.service';
import { Subscription } from 'rxjs';
import { ApplicantsService } from '../services/applicants.service';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css', '../app.component.css'],
  animations: [
    trigger(
      'slideInOutRight', 
      [
        transition(
          ':enter', 
          [
            style({ transform: 'translateX(1000px)', opacity: 0 }),
            animate('2s ease-out', 
                    style({ transform: 'translateX(0px)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ transform: 'translateX(0px)', opacity: 1 }),
            animate('2s ease-in', 
                    style({ transform: 'translateX(1000px)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})


export class PanelComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panelName = '';
  company = '';
  currentApplicant = '';
  comments = '';
  name = '';
  available = false;
  support = false;
  constructor(
    private panelStatus: PanelStatusService,
    private applicantService: ApplicantsService,
    private authService: AuthService
  ) {
    this.panelName = this.authService.user.name;
    // console.log('from local storage ', this.authService.user);
    // console.log('from local storage ', this.authService.isLogeedIn);
    // console.log('from local storage ', this.authService.loggedInMode);
  }

  ngOnInit(): void {
    this.company = this.authService.user.company;
    this.subscriptions.push(
      this.panelStatus.getPanelStatus(this.panelName).subscribe((res) => {
        this.available = !res.start;
        this.name = res.companyName;
        this.currentApplicant = res.currentApplicant;
        if (res.support === 'Requested') {
          this.support = true;
        } else {
          this.support = false;
        }
      })
    );
  }
  ngOnDestroy(): void {
    // remove subscriptions on exit
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    localStorage.clear();
  }

  next_candidate(): void {
    // update panel availability in database
    this.panelStatus.requestNext(this.panelName, true);
  }
  startInterview(): void {
    // update panel availability in database
    this.panelStatus.updateStart(this.panelName, true);
    this.panelStatus.updatePanelStatus(this.panelName, false);
    this.panelStatus.requestNext(this.panelName, false);
    this.applicantService.changeApplicantAvailability(
      this.currentApplicant,
      false
    );
  }
  endInterview(): void {
    this.panelStatus.updateCurrentApplicant(this.panelName, '');
    this.panelStatus.updatePanelStatus(this.panelName, true);
    this.panelStatus.updateStart(this.panelName, false);
    this.applicantService.changeApplicantAvailability(
      this.currentApplicant,
      true
    );
    this.applicantService.updateComments(
      this.company,
      this.currentApplicant,
      this.comments
    );
  }
  requestSupport(): void {
    // update panel availability in database
    this.panelStatus.updateSupport(this.panelName, 'Requested');
  }
  cancelSupport(): void {
    this.panelStatus.updateSupport(this.panelName, 'Solved');
  }

  onClickLogout() {
    this.authService.logOut();
  }
}
