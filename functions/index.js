const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const db = admin.firestore();
const defaultImg =
  "https://lh3.googleusercontent.com/a-/AOh14Gg_y1WjT42C9jvK6TcRXBemMGJS7qhIrXHnvPnyvQ";

const deleteUser = (userId) => {
  // console.log("Starting to Delete Children")
  db.collection("users")
    .where("uid", "==", userId)
    .get()
    .then((querySnaphot) => {
      const data = querySnaphot.docs.map((doc) => doc.id);
      console.log(data[0]);
      db.collection("users")
        .doc(data[0])
        .delete()
        .then(() => console.log("delete success"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const deleteUserChildren = (userId) => {
  console.log("starting to delete children");
  db.collection("children")
    .where("parent", "==", userId)
    .get()
    .then((querySnaphot) => {
      querySnaphot.docs.forEach((doc) => {
        console.log(doc.data());
        db.collection("children")
          .doc(doc.id)
          .delete()
          .then(() => console.log("children deleted"))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
};

exports.createUserData = functions
  .region("asia-east2")
  .auth.user()
  .onCreate((user) => {
    console.log(user);
    db.collection("users")
      .add({
        name: user.displayName || user.email,
        uid: user.uid,
        img: user.photoURL || defaultImg,
        type: "Guardian",
        description: "Description",
        occupation: "Occupation",
        address: "Address",
      })
      .then((docRef) => console.log("User Created:", docRef.id))
      .catch((err) => console.log(err));
  });

exports.deleteUsersChildren = functions
  .region("asia-east2")
  .auth.user()
  .onDelete((user) => {
    deleteUserChildren(user.uid);
  });

exports.deleteUserData = functions
  .region("asia-east2")
  .auth.user()
  .onDelete((user) => {
    deleteUser(user.uid);
    // deleteUserChildren(user.id);
  });
// functions.region("asia-east2").auth.user().onCreate
