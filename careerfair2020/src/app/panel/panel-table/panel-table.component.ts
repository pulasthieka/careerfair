import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {

  applicants = [
    {
      name : "Jacob Alhas",
      resume_url : "http://abd.cdm",
      panel: "panel 2",
      status: "Available"
    },
    {
      name : "Suwal Bas",
      resume_url : "http://abd.cdm",
      panel: "panel 1",
      status: "In interview"
    },
    {
      name : "Lenka Duma",
      resume_url : "http://abd.cdm",
      panel: "panel 4",
      status: "Hired"
    },
    {
      name : "Wol Bala",
      resume_url : "http://abd.cdm",
      panel: "panel 3",
      status: "Not interested"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
