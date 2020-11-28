# Firebase Scripts

This folder contains the scripts to:

1. Add data to Firebase Firestore.
2. Create accounts in Firebase Authentication
3. Set Firebase security rules
4. Deploy website to Firebase Hosting

For the correct data formats look at [Data Preparation](./DataPreparation.md)

## Adding Data to Firebase

Uncomment the relevant functions and run `addDataToFirebase.js`to update Firebase Firestore. [firebase-admin](https://www.npmjs.com/package/firebase-admin) should be installed and setup with access to the firebase project.

```
addData("students.json", "Students"); // add student.json to Students

addUsers("coordinator.json", "Coordinators"); // create user accounts and add coordinator.json to Students

addUsers("panels.json", "Panels"); // create user accounts and add panels.json to Panels

addCompanies("companies.json", "Companies"); // add company.json to Companies and update applicant subcollection
```

## Set up Security Rules

Modify `firestore.rules` and `storage.rules` to restrict access.

## Deploying to Firebase

Build the Angular application

```
$...\careerfair2020> ng build --prod
```

Deploy to Firebase Hosting

```
$...\firebase> firebase deploy
```
