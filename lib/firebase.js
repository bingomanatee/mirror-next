// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/firestore';
import pick from 'lodash/pick';

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
export const db = firebase.firestore();

export function getStory(render) {

  const query =  db
    .collection('farm')
    .orderBy('order', 'asc')
    .get()
    .then((snap) => {
      let story = [];
      snap.forEach((record) => {
        story.push({ id: record.id, ...record.data()})
      })
      render(story);
    })
}

export function saveStory(id, data) {
  const fields = pick(data, ['text', 'title', 'order', 'skips'])
  if (!Array.isArray(fields.skips)) fields.skips = [];

  if (!id) {
    return db.collection('farm').add(fields);
  }
  return db.collection("farm").doc(id).update(fields)
    .catch((err) => {
      console.log('error saving ', data, err);
    });
}

export function deleteStory(id) {
  return db.collection('farm').doc(id).delete();
}
