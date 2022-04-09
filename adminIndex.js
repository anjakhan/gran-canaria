import { firebase, signinUser, signinWithGoogle } from "./code/firebase.js";
import { WcAppLayout } from "./components/app-layout/WcAppLayout";
import { masterStyles } from "./styles.js";
const wcAppLayout = new WcAppLayout();
export let appUser = 'user';
function setDisplay(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = value;
    }
}
;
document.getElementById("createAccountCtrl")?.addEventListener("click", async () => {
    const email = document.getElementById("emailCtrl")?.value;
    const pwd = document.getElementById("passwordCtrl")?.value;
    await signinUser(email, pwd);
});
document.getElementById("google-signin")?.addEventListener("click", async () => {
    await signinWithGoogle();
});
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        user.email === 'trulli90@gmail.com' ? appUser = 'admin' : appUser = 'user';
        setDisplay("userAccount", "");
        setDisplay("loginPage", "none");
        const controlHost = document.getElementById('userAccount');
        controlHost?.append(wcAppLayout);
        const head = document.getElementsByTagName('head')[0];
        const s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.appendChild(document.createTextNode(masterStyles.toString()));
        head.appendChild(s);
    }
    else {
        setDisplay("loginPage", "");
    }
});
export const logoutFunc = () => {
    (async () => {
        await firebase.auth().signOut();
        window.location.reload();
    })();
};
document.getElementById("eye")?.addEventListener("click", () => {
    const eye = document.getElementById("eye");
    const input = document.getElementById("passwordCtrl");
    if (input.type === "password") {
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
        input.type = "text";
    }
    else {
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
        input.type = "password";
    }
    ;
});
//# sourceMappingURL=adminIndex.js.map