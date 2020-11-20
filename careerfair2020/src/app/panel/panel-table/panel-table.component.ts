import { Component, OnInit } from '@angular/core';
import Applicants from '../../../assets/applicants';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css'],
})
export class PanelTableComponent implements OnInit {
  applicants = Applicants;

  constructor() {}

  ngOnInit(): void {}
}
