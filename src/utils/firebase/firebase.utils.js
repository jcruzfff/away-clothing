import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Ku3pMDdUG2X9N93AmpBTcOI5nszxxxs",
  authDomain: "away-clothing-db.firebaseapp.com",
  projectId: "away-clothing-db",
  storageBucket: "away-clothing-db.appspot.com",
  messagingSenderId: "511277008465",
  appId: "1:511277008465:web:d45bac0a84c90d8ff2da70",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // Allows us to check if an instance of the db exists and access the data
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;

  //if user data does not exists
  //create / set the document with the data from userAuth in my collection

  //if user data exists
  //return userDocRef
};
