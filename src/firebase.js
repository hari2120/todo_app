// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAzqXVVs4gywhjvoa2xhvdVMVrlHdzp9Z8",
    authDomain: "todo-app-cp-e95a8.firebaseapp.com",
    projectId: "todo-app-cp-e95a8",
    storageBucket: "todo-app-cp-e95a8.appspot.com",
    messagingSenderId: "464430334958",
    appId: "1:464430334958:web:9bfd3fa0449b612bc584ff",
    measurementId: "G-T8K46ZQHV7"


});
const db= firebaseApp.firestore();

export { db };