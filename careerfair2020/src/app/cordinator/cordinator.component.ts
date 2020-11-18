import { Component, OnDestroy, OnInit } from '@angular/core';
import { Panel } from '../models/panel.model';
import PanelClass from '../models/panel.model';
import { CoordinatorService } from '../services/coordinator.service';
import { PanelStatusService } from '../services/panel-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cordinator',
  templateUrl: './cordinator.component.html',
  styleUrls: ['./cordinator.component.css'],
})
export class CordinatorComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  panels: Panel[] = [];
  coordinatorName = '';
  constructor(
    private panelStatus: PanelStatusService,
    private coordinator: CoordinatorService
  ) {}

  ngOnInit(): void {
    // set coordinator name and subscribe to panel status updates
    this.coordinatorName = 'DialogCoordinator'; // TODO - get this from login credentials
    this.subscriptions.push(
      this.coordinator.getPanels(this.coordinatorName).subscribe((res) => {
        this.panels = [];
        res.panels.forEach((panel) => {
          this.panels.push(new PanelClass(panel));
        });
        this.getAllPanelStatus();
      })
    );
  }
  ngOnDestroy(): void {
    // remove subscriptions on exit
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getAllPanelStatus(): void {
    this.panels.forEach((panel) => {
      this.subscriptions.push(
        this.panelStatus.getPanelStatus(panel.name).subscribe((res) => {
          panel.available = res.available;
          panel.support = res.support;
        })
      );
    });
  }

  cancelSupport(panelName): void {
    this.panelStatus.updateSupport(panelName, 'Solved');
  }
}
