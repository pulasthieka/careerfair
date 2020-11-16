import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import * as XLSX from 'xlsx';
import { CompanyModel, StudentModel } from '../models/data-entry.model';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  companyXL = '/assets/companies.xlsx';
  studentsXL = '/assets/students.xlsx';
  companyRef: AngularFirestoreCollection;
  studentRef: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    console.log('data entry service works');

    this.companyRef = firestore.collection('Companies');
    this.studentRef = firestore.collection('Students');
    // this.readCompanies(this.companyXL);
    // this.readStudents(this.studentsXL);
  }

  readCompanies(filePath: string) {
    let req = new XMLHttpRequest();
    req.open('GET', filePath, true);
    req.responseType = 'arraybuffer';
    let data;
    req.onload = (e) => {
      const dataObj = new Uint8Array(req.response);
      const workbook = XLSX.read(dataObj, { type: 'array' });

      const wsname: string = workbook.SheetNames[0];
      const ws: XLSX.WorkSheet = workbook.Sheets[wsname];

      data = XLSX.utils.sheet_to_json(ws);
      this.uploadCompaniesToDB(data);
    };
    req.send();
  }

  readStudents(filePath: string) {
    let req = new XMLHttpRequest();
    req.open('GET', filePath, true);
    req.responseType = 'arraybuffer';
    let data;
    req.onload = (e) => {
      const dataObj = new Uint8Array(req.response);
      const workbook = XLSX.read(dataObj, { type: 'array' });

      const wsname: string = workbook.SheetNames[0];
      const ws: XLSX.WorkSheet = workbook.Sheets[wsname];

      data = XLSX.utils.sheet_to_json(ws);
      this.uploadStudentsToDB(data);
    };
    req.send();
  }

  uploadCompaniesToDB(data: any) {
    data.forEach((item) => {
      let company: CompanyModel = {
        email: item.email,
        companyName: item.companyName,
        panelCount: item.panelCount,
      };
      this.companyRef.add(company).then(
        (res) => {
          console.log('company response: ', res);
        },
        (err) => console.log(err)
      );
    });
  }

  uploadStudentsToDB(data: any) {
    data.forEach((item) => {
      let student: StudentModel = {
        index: item.index,
        name: item.name,
        profile: item.profile,
      };
      this.studentRef.add(student).then(
        (res) => {
          console.log('student response: ', res);
        },
        (err) => console.log(err)
      );
    });
  }
}
