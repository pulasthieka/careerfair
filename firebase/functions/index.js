// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
/**
 * Mahmud Ahsan https://medium.com/level-up-programming/how-to-upload-files-from-firebase-cloud-functions-to-firebase-cloud-storage-9d8b1a0f65e5
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const https = require("https");
const axios = require("axios");
const path = require("path");
const os = require("os");
const fs = require("fs");
const got = require("got");
const FileType = require("file-type");

// Collections
const collection = "Companies";

exports.moveCV = functions.https.onCall(async (URL, newLocation, context) => {
  const uid = context.auth.uid;
  const data = snapshot.data();

  const mediaUrl = data.resume_url; //change here
  const storageMediaId = data.id;

  let tmpDownloadedFile = null;

  try {
    // // Step 1: Download mediaUrl to temporary directory
    // tmpDownloadedFile = await downloadRemoteUrlImage(mediaUrl, storageMediaId);
    // console.log("Download Complete: File Path: " + tmpDownloadedFile.filePath + " - File Name: ", tmpDownloadedFile.fileName);

    // // Step 2: Upload to Firestore Storage
    // await uploadLocalFileToStorage(tmpDownloadedFile.filePath, tmpDownloadedFile.fileName);

    // Step 3: Update `collection`
    return `Cloud Says Hello to ${uid}`;
  } catch (error) {
    console.log("error on downloading and uploading remote media file to storage: " + error);
  }
});

/**
 *
 * @param {String} fileUrl
 * @param {String} fileName
 */
async function downloadRemoteUrlImage(fileUrl, fileName) {
  // Identify the remote file type
  let fileExt = "";
  const fileType = await retrieveStreamFileType(fileUrl);
  if (fileType) {
    fileExt = "." + fileType.ext;
  }

  const fileNameWithExt = fileName + fileExt;
  const tempFilePath = path.join(os.tmpdir(), fileNameWithExt);
  // console.log("Temp File Path: " + tempFilePath);

  const writer = fs.createWriteStream(tempFilePath);

  return axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  }).then((response) => {
    // Wait for another promise to write the file completely into disk
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        throw new Error(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve({
            filePath: tempFilePath,
            fileName: fileNameWithExt,
          });
        }
      });
    });
  });
}

/**
 * Retrieve the file type .jpg, .png, etc.
 * @param {String} fileUrl
 */
async function retrieveStreamFileType(fileUrl) {
  const stream = got.stream(fileUrl);

  try {
    const fileType = await FileType.fromStream(stream);
    return fileType;
  } catch (e) {
    console.error("error trying to identify remote file type: ", e);
    return null;
  }
}

/**
 * Upload the file in firestore storage
 * @param {String} filePath
 * @param {String} fileName
 */
async function uploadLocalFileToStorage(filePath, fileName) {
  const imageBucket = "images/";

  const bucket = admin.storage().bucket();
  const destination = `${imageBucket}${fileName}`;

  try {
    // Uploads a local file to the bucket
    await bucket.upload(filePath, {
      destination: destination,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    console.log(`${fileName} uploaded to /${imageBucket}/${fileName}.`);
  } catch (e) {
    throw new Error("uploadLocalFileToStorage failed: " + e);
  }
}
