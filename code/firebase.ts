import { FotoUploadDto } from '../code/nobs/UploadNobs';
import { Sightseeing } from '../pages/all-island-page/WcAllIslandPage';

export const firebase = (<any>window).firebase;

const config = {
  apiKey: "AIzaSyAuvLTt0pKvS5Vy3WH7p7s9OR4E8y5VlCA",
  authDomain: "gran-canaria-4e556.firebaseapp.com",
  projectId: "gran-canaria-4e556",
  storageBucket: "gran-canaria-4e556.appspot.com",
  messagingSenderId: "805514539725",
  appId: "1:805514539725:web:9fbe21d95fc47ba9372f84"
};

firebase.initializeApp(config);

const checkErrorCode = (errorCode: string) => {
  const errorContainer = document.getElementById("errorContainer")
  const errorWrapper = document.getElementById("errorWrapper");
  errorContainer ? errorContainer.style.display = "" : false;
  if (errorCode === "auth/email-already-in-use") {
    errorWrapper ? errorWrapper.innerHTML = "This email address is already in use. <br>Did you mean to sign in?" : "";
  } else if (errorCode === "auth/invalid-email") {
    errorWrapper ? errorWrapper.textContent = "Invalid e-mail address!" : "";
  } else if (errorCode === "auth/weak-password") {
    errorWrapper ? errorWrapper.textContent = "Your password is weaaaak!" : "";
  } else if (errorCode === "auth/wrong-password") {
    errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
  } else if (errorCode === "auth/user-not-found") {
    errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
  } else if (errorCode === "auth/too-many-requests") {
    errorWrapper ? errorWrapper.innerHTML = "Access to this account has been temporarily <br>disabled due to many failed login attempts." : "";
  }
}

export async function signinWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);
    throw error;
  }
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    userCredential.user.updateProfile({ displayName: name });
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    // const errorMessage = error.message;

    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    checkErrorCode(errorCode);

    throw error;
  }
};

export async function signinUser(email: string, password: string) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    checkErrorCode(errorCode);
    throw error;
  }
};

export const createSightseeingDocument = (sightseeingdoc: Sightseeing) => {
  firestore.collection("sightseeings").add({
    id: '',
    name: sightseeingdoc.name,
    hash: sightseeingdoc.hash,
    image: sightseeingdoc.image,
    foldername: sightseeingdoc.foldername,
    orientation: sightseeingdoc.orientation,
    location: sightseeingdoc.location,
    tags: sightseeingdoc.tags,
    topic: sightseeingdoc.topic,
    info: sightseeingdoc.info || ""
  })
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
      console.log('Sightseeing added');
      firestore.collection('sightseeings').doc(`${docRef.id}`).set({
        id: docRef.id
      }, { merge: true });
    })
    .catch((error: string) => {
      console.error("Error adding document: ", error);
    });
};

export const geSightseeingDocs = () => {
  const docs = firestore.collection("sightseeings").get()
    .then((querySnapshot: any) => {
      return querySnapshot.docs.map((doc: any) => doc.data());
    })
  return docs;
};

export const createTravelDocument = (traveldoc: FotoUploadDto) => {
  firestore.collection("grancanaria").add({
    id: '',
    headline: traveldoc.headline,
    story: traveldoc.story,
    foldername: traveldoc.date + '_' + traveldoc.foldername,
    date: traveldoc.date,
    location: traveldoc.location,
    popup: traveldoc.popup,
    image: traveldoc.image,
  })
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
      alert('Fotostory created');
      firestore.collection('grancanaria').doc(`${docRef.id}`).set({
        id: docRef.id
      }, { merge: true });
    })
    .catch((error: string) => {
      console.error("Error adding document: ", error);
    });
};

export const getTravelDocs = () => {
  const docs = firestore.collection("grancanaria").get()
    .then((querySnapshot: any) => {
      return querySnapshot.docs.map((doc: any) => doc.data());
    })
  return docs;
};

export const uploadImage = (file: any, foldername: string) => {
  const storage = firebase.storage().ref(`${foldername}/${file.name}`);
  storage.put(file);
};

export const dowloadFile = (filename: string) => {
  const storageRef = firebase.storage().ref();
  return storageRef.child(filename).getDownloadURL();
};

// const getImgRes = (itemRef: any) => {
//   return itemRef.getDownloadURL()
// };

// export const getImages = (foldername: any) => {
//   const storageRef = firebase.storage().ref(foldername);
//   let pictures;
//   storageRef.listAll().then((res: any) => {
//     res.items.forEach((itemRef: any) => console.log(getImgRes(itemRef)));
//   }).catch((err: string) => console.log(err))
//   return pictures;
// };

export async function downloadImageURL(foldername: string) {
  let listOfUrls: any = [];
  var storageRef = firebase.storage().refFromURL(foldername);
  storageRef.listAll().then((res: any) => {
    listOfUrls = res.items.map((item: any) => item.getDownloadURL().then((downloadURLs: any) => downloadURLs));
    //console.log(listOfUrls)
  })
  if (listOfUrls.length === 0) {
    window.setTimeout(() => console.log(listOfUrls), 2000)
    return listOfUrls;
  } else {
    return listOfUrls;
  }
}

export const firestore = firebase.firestore();