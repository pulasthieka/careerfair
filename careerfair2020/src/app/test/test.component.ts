import { Component, OnInit } from '@angular/core';
import { DataEntryService } from '../services/data-entry.service';
import data from '../../assets/companies';
import panels from '../../assets/panels';
import students from '../../assets/students';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private dataEntry: DataEntryService) {}

  ngOnInit(): void {
    const panelJSON = data;
    // this.dataEntry.uploadCompaniesToDB(panelJSON);
    // this.dataEntry.uploadPanelsToDB(panels);
    // this.dataEntry.uploadApplicants(students);
  }
}
