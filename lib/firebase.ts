import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBDPSWdw9-pI4gmUHcGsnXile2rdcrT-MY',
  authDomain: 'redux-essentials.firebaseapp.com',
  projectId: 'redux-essentials',
  storageBucket: 'redux-essentials.appspot.com',
  messagingSenderId: '871825618983',
  appId: '1:871825618983:web:c44062c5a0289482e7b602',
  measurementId: 'G-FMZFM04V3Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
