import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { Coordinator } from '../models/coordinator.model';
import { CompanyModel, StudentModel } from '../models/data-entry.model';
import { Company } from '../models/company.model';
import { Panel } from '../models/panel.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  // companyXL = '/assets/companies.xlsx';
  // studentsXL = '/assets/students.xlsx';
  companyRef: AngularFirestoreCollection;
  studentRef: AngularFirestoreCollection;
  panelRef: AngularFirestoreCollection;
  coordinatorRef: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    console.log('data entry service works');

    this.companyRef = firestore.collection(environment.CompanyCollection);
    this.studentRef = firestore.collection(environment.ApplicantCollection);
    this.panelRef = firestore.collection(environment.PanelCollection);
    this.coordinatorRef = firestore.collection(
      environment.CoordinatorCollection
    );
    // this.readCompanies(this.companyXL);
    // this.readStudents(this.studentsXL);
  }

  // readCompanies(filePath: string) {
  //   let req = new XMLHttpRequest();
  //   req.open('GET', filePath, true);
  //   req.responseType = 'arraybuffer';
  //   let data;
  //   req.onload = (e) => {
  //     const dataObj = new Uint8Array(req.response);
  //     const workbook = XLSX.read(dataObj, { type: 'array' });

  //     const wsname: string = workbook.SheetNames[0];
  //     const ws: XLSX.WorkSheet = workbook.Sheets[wsname];

  //     data = XLSX.utils.sheet_to_json(ws);
  //     this.uploadCompaniesToDB(data);
  //   };
  //   req.send();
  // }

  // readStudents(filePath: string) {
  //   let req = new XMLHttpRequest();
  //   req.open('GET', filePath, true);
  //   req.responseType = 'arraybuffer';
  //   let data;
  //   req.onload = (e) => {
  //     const dataObj = new Uint8Array(req.response);
  //     const workbook = XLSX.read(dataObj, { type: 'array' });

  //     const wsname: string = workbook.SheetNames[0];
  //     const ws: XLSX.WorkSheet = workbook.Sheets[wsname];

  //     data = XLSX.utils.sheet_to_json(ws);
  //     this.uploadStudentsToDB(data);
  //   };
  //   req.send();
  // }

  uploadCompaniesToDB(data: any): void {
    data.forEach((item) => {
      const company = {
        name: item.name,
        panels: item.panels,
      };
      this.companyRef
        .doc(item.name)
        .set(company)
        .then(
          (res) => {
            var promises: Promise<void>[] = [];
            item.applicants.forEach((applicant) => {
              let app = {
                panel_id: applicant.panel_id,
                resume_url: applicant.resume_url,
                status: applicant.status,
                applicant_id: applicant.applicant_id,
              };
              console.log(app);
              promises.push(
                this.companyRef
                  .doc(item.name)
                  .collection('applicants')
                  .doc(applicant.applicant_id)
                  .set(app)
              );
            });
            Promise.all(promises)
              .then(function () {
                console.log('All subcollections were added!');
              })
              .catch(function (error) {
                console.log(
                  'Error adding subcollections to Firestore: ' + error
                );
              });
          },
          (err) => console.log(err)
        );
    });
  }

  // uploadStudentsToDB(data: any) {
  //   data.forEach((item) => {
  //     let student: StudentModel = {
  //       index: item.index,
  //       name: item.name,
  //       profile: item.profile,
  //     };
  //     this.studentRef.add(student).then(
  //       (res) => {
  //         console.log('student response: ', res);
  //       },
  //       (err) => console.log(err)
  //     );
  //   });
  // }

  uploadPanelsToDB(data: any): void {
    data.forEach((item) => {
      const panel: Panel = {
        name: item.name,
        available: item.available,
        support: item.support,
        company: item.company,
        currentApplicant: item.currentApplicant,
      };
      this.panelRef
        .doc(item.name)
        .set(panel)
        .then(
          (res) => {
            console.log('Panel response: ', res);
          },
          (err) => console.log(err)
        );
    });
  }

  uploadCoordinatorsToDB(data: any): void {
    data.forEach((item) => {
      const panel: Coordinator = {
        panels: item.panels,
        name: item.name,
      };
      this.coordinatorRef
        .doc(item.name)
        .set(panel)
        .then(
          (res) => {
            console.log('Coordinator response: ', res);
          },
          (err) => console.log(err)
        );
    });
  }

  uploadApplicants(data: any): void {
    data.forEach((item) => {
      const student: Student = {
        index: item.index,
        email: item.email,
        name: item.name,
        mobile: item.contactNumber,
        address: item.homeAddress,
        interests: item.interestedFields.split(','),
        profile: item.profile,
        photo: item.index + '.jpg',
        available: true,
      };
      this.studentRef
        .doc(item.index)
        .set(student)
        .then(
          (res) => {
            console.log('company response: ', res);
          },
          (err) => console.log(err)
        );
    });
  }
}
