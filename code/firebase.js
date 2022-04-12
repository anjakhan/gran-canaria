export const firebase = window.firebase;
const config = {
    apiKey: "AIzaSyAuvLTt0pKvS5Vy3WH7p7s9OR4E8y5VlCA",
    authDomain: "gran-canaria-4e556.firebaseapp.com",
    projectId: "gran-canaria-4e556",
    storageBucket: "gran-canaria-4e556.appspot.com",
    messagingSenderId: "805514539725",
    appId: "1:805514539725:web:9fbe21d95fc47ba9372f84"
};
firebase.initializeApp(config);
const checkErrorCode = (errorCode) => {
    const errorContainer = document.getElementById("errorContainer");
    const errorWrapper = document.getElementById("errorWrapper");
    errorContainer ? errorContainer.style.display = "" : false;
    if (errorCode === "auth/email-already-in-use") {
        errorWrapper ? errorWrapper.innerHTML = "This email address is already in use. <br>Did you mean to sign in?" : "";
    }
    else if (errorCode === "auth/invalid-email") {
        errorWrapper ? errorWrapper.textContent = "Invalid e-mail address!" : "";
    }
    else if (errorCode === "auth/weak-password") {
        errorWrapper ? errorWrapper.textContent = "Your password is weaaaak!" : "";
    }
    else if (errorCode === "auth/wrong-password") {
        errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
    }
    else if (errorCode === "auth/user-not-found") {
        errorWrapper ? errorWrapper.innerHTML = "Invalid e-mail address or password. <br>Please try again!" : "";
    }
    else if (errorCode === "auth/too-many-requests") {
        errorWrapper ? errorWrapper.innerHTML = "Access to this account has been temporarily <br>disabled due to many failed login attempts." : "";
    }
};
export async function signinWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        return userCredential;
    }
    catch (error) {
        const errorCode = error.code;
        checkErrorCode(errorCode);
        throw error;
    }
}
export async function createUser(name, email, password) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        userCredential.user.updateProfile({ displayName: name });
        return userCredential;
    }
    catch (error) {
        const errorCode = error.code;
        checkErrorCode(errorCode);
        throw error;
    }
}
;
export async function signinUser(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential;
    }
    catch (error) {
        const errorCode = error.code;
        checkErrorCode(errorCode);
        throw error;
    }
}
;
export const createSightseeingDocument = (sightseeingdoc) => {
    firestore.collection("sightseeings").add({
        id: '',
        name: sightseeingdoc.name,
        image: sightseeingdoc.image,
        foldername: sightseeingdoc.foldername,
        orientation: sightseeingdoc.orientation,
        location: sightseeingdoc.location,
        tags: sightseeingdoc.tags,
        topic: sightseeingdoc.topic,
        info: sightseeingdoc.info || ""
    })
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('Sightseeing added');
        firestore.collection('sightseeings').doc(`${docRef.id}`).set({
            id: docRef.id
        }, { merge: true });
    })
        .catch((error) => {
        console.error("Error adding document: ", error);
    });
};
export const geSightseeingDocs = () => {
    const docs = firestore.collection("sightseeings").get()
        .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
    });
    return docs;
};
export const createTravelDocument = (traveldoc) => {
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
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert('Fotostory created');
        firestore.collection('grancanaria').doc(`${docRef.id}`).set({
            id: docRef.id
        }, { merge: true });
    })
        .catch((error) => {
        console.error("Error adding document: ", error);
    });
};
export const getTravelDocs = () => {
    const docs = firestore.collection("grancanaria").get()
        .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
    });
    return docs;
};
export const uploadImage = (file, foldername) => {
    const storage = firebase.storage().ref(`${foldername}/${file.name}`);
    storage.put(file);
};
export const dowloadFile = (filename) => {
    const storageRef = firebase.storage().ref();
    return storageRef.child(filename).getDownloadURL();
};
export async function downloadImageURL(foldername) {
    let listOfUrls = [];
    var storageRef = firebase.storage().refFromURL(foldername);
    storageRef.listAll().then((res) => {
        listOfUrls = res.items.map((item) => item.getDownloadURL().then((downloadURLs) => downloadURLs));
    });
    if (listOfUrls.length === 0) {
        window.setTimeout(() => console.log(listOfUrls), 2000);
        return listOfUrls;
    }
    else {
        return listOfUrls;
    }
}
export const firestore = firebase.firestore();
//# sourceMappingURL=firebase.js.map