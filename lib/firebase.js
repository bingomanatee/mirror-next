// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyATB6NvOYIn67H7-agAkZt2FdNBW652TDo",
  authDomain: "wll-mirror.firebaseapp.com",
  projectId: "wll-mirror",
  storageBucket: "wll-mirror.appspot.com",
  messagingSenderId: "648715608974",
  appId: "1:648715608974:web:8eec8c3fcf7c531ee03adf"
};

let deb;
try {
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.log('bullshit error: ', err.message)
}
const db = firebase.firestore();

function getStory(render) {

  const query =  db
    .collection('farm')
    .orderBy('order', 'asc')
    .get()
    .then((snap) => {
      let story = [];
      snap.forEach((record) => {
        story.push(record.data())
      })
      render(story);
    })
}

module.exports = {db, getStory};
