import { firestore } from './init';
import { collection } from 'firebase/firestore';

export enum Paths {
	Applications = 'application',
	Users = 'users',
}

export const applicationsRef = collection(firestore, Paths.Applications);
export const usersRef = collection(firestore, Paths.Users);
