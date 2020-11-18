import { Component, OnInit } from '@angular/core';
import { DataEntryService } from '../services/data-entry.service';
import data from '../../assets/applicants';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private dataEntry: DataEntryService) {}

  ngOnInit(): void {
    const panelJSON = data.slice(0, 5);
    // this.dataEntry.uploadApplicants(panelJSON);
  }
}
