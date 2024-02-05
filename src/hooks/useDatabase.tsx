import { initializeApp } from 'firebase/app';
import { IDevice } from '../constants/types';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, arrayUnion, updateDoc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDznYm917S6YgEzgzPtMcXFMzXMfUeZVow',
  authDomain: 'baby-band-db.firebaseapp.com',
  databaseURL: 'https://baby-band-db-default-rtdb.firebaseio.com',
  projectId: 'baby-band-db',
  storageBucket: 'baby-band-db.appspot.com',
  messagingSenderId: '1018849857741',
  appId: '1:1018849857741:web:f388c22ddd27d5813bd984',
  measurementId: 'G-FJZG4THVEG',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const get_devices = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    // console.log('userid', userId);
    // const deviceRef = collection(db, `users/${userId}/devices`);
    // const snapshot = await getDocs(deviceRef);
    // console.log('snapshot', snapshot.docs)
    // const devices = snapshot.docs.map(doc => doc.data());
    // console.log('devices',devices);
    // return devices
    let userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
  
    if (docSnap.exists()) {
      console.log("User Data: ", docSnap.data());
      const userData=docSnap.data();
      return userData.devices; // returns user data as a JavaScript object
    } else {
      console.log("No such document!");
      return [];
    }
  }
  return [];
}

const db_add_device = async ({ name, uuid, strength, connection }: IDevice) => {
  if (auth.currentUser) {
    const newDevice = {
      name: name,
      uuid: uuid,
      strength: strength,
      connection: connection,
    }

    var userId = auth.currentUser.uid;
    const devicesRef = collection(doc(db, 'users', userId), 'devices');
    await setDoc(doc(devicesRef), newDevice);
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        devices: [newDevice],
      });
    } else {
      await updateDoc(userRef, {
        devices: arrayUnion(newDevice)
      });
    }
  }
}

const db_signup = async (email: string, password: string) => {
  let result = false;
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          profile:{
            language:"En",
            color:"red",
            name:"",
            temperature:"celcius",
            sliceTime:1
          }
        });
        result = true;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    result = false;
  }
  return result
};

const db_signin = async (email: string, password: string) => {
  let result = false;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        result = true;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    result = false;
  }
  return result
};

export default { db_signup, db_signin, db_add_device, get_devices };
