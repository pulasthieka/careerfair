var admin = require("firebase-admin");
const { Firestore } = require("@google-cloud/firestore");
var serviceAccount = require("./careerfair-entc-firebase-adminsdk-yx36z-b2e54410c2.json");
const fs = require("fs");
var crud = require("./fireAdminOperations");
const { app } = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://careerfair-entc.firebaseio.com",
});
const fire = admin.firestore();
// running functions
// crud.deleteAllUsers();
// crud.listUsers();

addUsers("new/new_panels.json", "PanelsFinal");
addData("new/new_coordinator.json", "CoordinatorsFinal");
addCompanies("new/new_companies.json", "CompaniesFinal");

//Add new users to firebase
// addUsers("coordinator.json", "Coordinators");

// all functions

function addData(file, collectionName) {
  let fileData = fs.readFileSync(`data/${file}`);
  let colRef = fire.collection(collectionName);
  todB = {};
  const fileJSONData = JSON.parse(fileData);
  var batch = fire.batch();
  console.log(fileData);
  fileJSONData.forEach((el) => {
    batch.set(colRef.doc(el.uid), el);
  });
  batch
    .commit()
    .then((result) => {
      console.log("Successfully added ", result);
    })
    .catch((err) => {
      console.log("Write failed with: ", err);
    });
}
function addUsers(file, collectionName) {
  let fileData = fs.readFileSync(`data/${file}`);
  let colRef = fire.collection(collectionName);
  todB = {};
  const fileJSONData = JSON.parse(fileData);
  console.log(fileData);
  var batch = fire.batch();
  fileJSONData.forEach((el) => {
    crud.createUser(el.username, el.password);
    batch.set(colRef.doc(el.uid), el);
  });
  batch
    .commit()
    .then((result) => {
      console.log("Successfully added ", result);
    })
    .catch((err) => {
      console.log("Write failed with: ", err);
    });
}
function addCompanies(file, collectionName) {
  let fileData = fs.readFileSync(`data/${file}`);
  let colRef = fire.collection(collectionName);
  todB = {};
  const fileJSONData = JSON.parse(fileData);

  fileJSONData.forEach((el) => {
    let company = {
      email: el.email,
      name: el.name,
      panels: el.panels,
    };
    // console.log(company);
    var applicants = el.applicants;
    colRef
      .doc(el.uid)
      .set(company)
      // .then((result) => {
      //   // console.log(result);
      //   var appRef = colRef.doc(el.uid).collection("applicants");
      //   // console.log(appRef, result);
      //   let batch = fire.batch();
      //   applicants.forEach((applicant) => {
      //     // console.log(applicant.uid);
      //     // appRef.doc(applicant.uid).set(applicant);
      //     batch.set(appRef.doc(applicant.uid), applicant);
      //   });
      //   batch
      //     .commit()
      //     .then((result) => {
      //       console.log("Successfully added ", result);
      //     })
      //     .catch((err) => {
      //       console.log("Write to subCollection failed with: ", err);
      //     });
      //   console.log("Successfully added ", el.uid);
      // })
      .catch((err) => {
        console.log("Write failed with: " + el.uid);
      });
  });
}

function deleteData(file, collectionName) {
  let fileData = fs.readFileSync(`data/${file}`);
  const fileJSONData = JSON.parse(fileData);
  fileJSONData.data.forEach(function (el) {
    fire
      .collection(collectionName)
      .doc(el.uid)
      .delete()
      .then((result) => {
        console.log("Successfully deleted: ", el.uid);
      })
      .catch((err) => {
        console.log("Write failed with: ", el.uid);
      });
  });
}
