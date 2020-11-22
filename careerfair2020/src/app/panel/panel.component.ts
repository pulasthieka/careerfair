import { Component, OnDestroy, OnInit } from '@angular/core';
import { PanelStatusService } from '../services/panel-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panelName = '';
  currentApplicant = '';
  available = false;
  support = false;
  constructor(private panelStatus: PanelStatusService) {
    this.panelName = 'Dialog1'; // TODO - replace with logic to get panel name from login credintials
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.panelStatus.getPanelStatus(this.panelName).subscribe((res) => {
        this.available = res.available;
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
  }

  next_candidate(): void {
    // update panel availability in database
    this.panelStatus.updatePanelStatus(this.panelName, true);
  }
  startInterview(): void {
    // update panel availability in database
    this.panelStatus.updatePanelStatus(this.panelName, false);
  }
  endInterview(): void {
    this.panelStatus.updateCurrentApplicant(this.panelName, '');
    this.panelStatus.updatePanelStatus(this.panelName, true);
  }
  requestSupport(): void {
    // update panel availability in database
    this.panelStatus.updateSupport(this.panelName, 'Requested');
  }
  cancelSupport(): void {
    this.panelStatus.updateSupport(this.panelName, 'Solved');
  }
}
