import { initializeApp } from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'
const firebaseConfig = {
    apiKey: "AIzaSyDeAvLFUpk8dppZf6dPm2UUxZ9kJhzWpdY",
    authDomain: "login-d18b6.firebaseapp.com",
    projectId: "login-d18b6",
    storageBucket: "login-d18b6.appspot.com",
    messagingSenderId: "671601578219",
    appId: "1:671601578219:web:197f6f1a7cdac1395caeae",
    measurementId: "G-5BT1M21H6T"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }
export default firebaseConfig;
