var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export function signinWithGoogle() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const userCredential = yield firebase.auth().signInWithPopup(provider);
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
}
export function createUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
            userCredential.user.updateProfile({ displayName: name });
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
}
;
export function signinUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userCredential = yield firebase.auth().signInWithEmailAndPassword(email, password);
            return userCredential;
        }
        catch (error) {
            const errorCode = error.code;
            checkErrorCode(errorCode);
            throw error;
        }
    });
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
        topic: sightseeingdoc.topic
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
        image: traveldoc.image
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
export function downloadImageURL(foldername) {
    return __awaiter(this, void 0, void 0, function* () {
        const listOfUrls = [];
        var storageRef = firebase.storage().refFromURL(foldername);
        storageRef.listAll().then((res) => {
            res.items.forEach((item) => item.getDownloadURL().then((downloadURLs) => console.log(downloadURLs)));
        });
        return listOfUrls;
    });
}
export const firestore = firebase.firestore();
//# sourceMappingURL=firebase.js.map