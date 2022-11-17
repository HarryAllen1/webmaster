import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAU8QumOx0drOpBQ7rmaMPpSJTYNcnGUBs',
	authDomain: 'webmaster-tsa.firebaseapp.com',
	projectId: 'webmaster-tsa',
	storageBucket: 'webmaster-tsa.appspot.com',
	messagingSenderId: '54073035471',
	appId: '1:54073035471:web:5f40b4f3fe91b66f3085ba',
	measurementId: 'G-8MSL7F4EHF',
};

export const app = initializeApp(config);
export const firestore = getFirestore(app);
