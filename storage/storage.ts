import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ProfileData } from '@/types/types';


export const saveProfile = async (profileData: ProfileData): Promise<void> => {
  try {
    const userRef = collection(db, 'users');
    await addDoc(userRef, profileData);
    console.log('Profile saved successfully');
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

export const getProfile = async (): Promise<ProfileData | null> => {
  try {
    const q = query(collection(db, 'users'), orderBy('__name__', 'desc'), limit(1)); // fetch latest profile
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data() as ProfileData;
    }

    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
