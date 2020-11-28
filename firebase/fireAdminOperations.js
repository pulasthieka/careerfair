var admin = require("firebase-admin");
module.exports = {
  listUsers: async function listUsers() {
    return await admin
      .auth()
      .listUsers()
      .then((listUsersResult) => {
        let usersList = [];
        listUsersResult.users.forEach((user) => {
          let k = {};
          k.uid = user.uid;
          k.email = user.email;
          k.lastSignIn = user.metadata.lastSignInTime;
          usersList.push(k);
        });
        let users = JSON.stringify(usersList);
        fs.writeFile("user.json", users, (err) => {
          if (err) {
            throw err;
          }
          console.log("JSON data is saved");
        });
        return Promise.resolve(usersList);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  },
  writeToFile: function writeToFile(data) {
    // write JSON string to a file
    fs.writeFile("user.json", data, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  },
  updatePassword: function updatePassword(email, newPassword) {
    admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        //   console.log(`Successfully fetched user data: ${JSON.stringify(userRecord.toJSON())}`);
        admin
          .auth()
          .updateUser(userRecord.uid, {
            password: newPassword,
          })
          .then((userRecord2) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully updated user", userRecord2.email, newPassword);
          })
          .catch((error) => {
            console.log("Error updating user:", error);
          });
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  },
  createUser: function createUser(email, password) {
    return admin
      .auth()
      .createUser({
        email: email,
        password: password,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
      });
  },
  deleteAllUsers: function deleteAllUsers() {
    listUsers().then((users) => {
      // console.log(users);
      let todelete = [];
      users.forEach((user) => {
        todelete.push(user.uid);
      });
      console.log(todelete);
      admin
        .auth()
        .deleteUsers(todelete)
        .then((deleteUsersResult) => {
          console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
          console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
          deleteUsersResult.errors.forEach((err) => {
            console.log(err.error.toJSON());
          });
        })
        .catch((error) => {
          console.log("Error deleting users:", error);
        });
    });
  },
};
