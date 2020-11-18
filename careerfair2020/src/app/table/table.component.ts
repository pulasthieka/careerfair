import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  title = 'Panel1Table';
  headers = ['Name', 'Resume', 'Panel', 'Status', 'Remarks'];
  rows = [
    {
      Name : 'Sachith',
      Resume : 'Link',
      Panel : 'Panel 1',
      Status : 'Ready',
      Remarks : 'ENTC'
    }
  ];

}
