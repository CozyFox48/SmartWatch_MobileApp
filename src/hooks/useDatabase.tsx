import { initializeApp } from 'firebase/app';
import { IAlert, IDevice } from '../constants/types';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDocs, setDoc, collection, query, limit, orderBy, getDoc, updateDoc } from 'firebase/firestore';

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

const set_data = async (finalResult, currentMinute) => {
  if (auth.currentUser) {
    const result = JSON.parse(JSON.stringify(finalResult));
    const day = currentMinute.toString().substring(0, 8);
    const minute = currentMinute.toString().substring(8, 13);
    const userId = auth.currentUser.uid;
    for (const deviceID in result) {
      for (const eachType of ['oxygen', 'heart', 'temperature']) {
        const typeRef = collection(doc(db, 'users', userId, 'devices', deviceID), eachType);
        const typeSnapshot = await getDocs(typeRef);
        let flag = true;
        if (!typeSnapshot.empty) {
          const documentRef = doc(typeRef, day);
          const documentSnapshot = await getDoc(documentRef);
          if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            await updateDoc(documentRef, {
              max: result[deviceID][eachType].max > documentData.max ? result[deviceID][eachType].max : documentData.max,
              min: result[deviceID][eachType].min > documentData.min ? result[deviceID][eachType].min : documentData.min,
              count: result[deviceID][eachType].count + documentData.count,
              average: parseFloat(((documentData.count * documentData.average + result[deviceID][eachType].count * result[deviceID][eachType].average)
                / (result[deviceID][eachType].count + documentData.count)).toFixed(2)),
              highAlertCount: result[deviceID][eachType].highAlertCount + documentData.highAlertCount,
              lowAlertCount: result[deviceID][eachType].lowAlertCount + documentData.lowAlertCount
            });
            flag = false;
          }
        }
        if (flag) {
          await setDoc(doc(typeRef, day), {
            max: result[deviceID][eachType].max,
            min: result[deviceID][eachType].min,
            average: result[deviceID][eachType].average,
            count: result[deviceID][eachType].count,
            highAlertCount: result[deviceID][eachType].highAlertCount,
            lowAlertCount: result[deviceID][eachType].lowAlertCount,
            date: parseInt(day)
          });
          console.log('Created new date ' + day);
        }
        const DayRef = collection(doc(typeRef, day), 'data');
        await setDoc(doc(DayRef, minute), { value: result[deviceID][eachType].average });
      }

    }
  }
}

const get_devices = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const devicesRef = collection(db, 'users', userId, 'devices');
    const q = query(devicesRef);
    let result = [];
    await getDocs(q).then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        result.push({
          ...documentSnapshot.data(),
          connection: true,
          deviceID: documentSnapshot.id
        })
      });
    });
    return result;
  }
  return []
}

const get_alerts = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const devicesRef = collection(db, 'users', userId, 'alerts');
    const q = query(devicesRef, orderBy('date', 'desc'), limit(10));
    let result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((documentSnapshot) => {
      result.push({
        ...documentSnapshot.data()
      });
    });
    return result;
  }
  return [];
};

const db_add_alert = async (eachAlert: IAlert) => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const devicesRef = collection(doc(db, 'users', userId), 'alerts');
    await setDoc(doc(devicesRef), eachAlert);
  }
}

const db_add_device = async ({ name, uuid, strength, connection }: IDevice) => {
  if (auth.currentUser) {
    const newDevice = {
      name: name,
      uuid: uuid,
      strength: strength,
      connection: connection,
    }

    const userId = auth.currentUser.uid;
    const devicesRef = collection(doc(db, 'users', userId), 'devices');
    await setDoc(doc(devicesRef), newDevice);
  }
}

const db_signup = async (email: string, password: string) => {
  let result = false;
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          profile: {
            language: "En",
            color: "red",
            name: "",
            temperature: "celcius",
            sliceTime: 1
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

const get_user_data = async () => {
  if (auth.currentUser) {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.profile;
    }
  }
  return {};
}

const update_user_data = async (userData) => {
  if (auth.currentUser) {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
      profile: userData
    });
  }
}

export default { db_signup, db_signin, db_add_device, get_devices, db_add_alert, get_alerts, get_user_data, update_user_data, set_data };
