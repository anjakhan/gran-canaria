import { signinWithGoogle, createUser, firebase } from "./code/firebase";
function setDisplay(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = value;
    }
}
let first = true;
document.getElementById("createAccountCtrl")?.addEventListener("click", async () => {
    const name = document.getElementById("nameCtrl")?.value;
    const email = document.getElementById("emailCtrl")?.value;
    const pwd = document.getElementById("passwordCtrl")?.value;
    first = false;
    await createUser(name, email, pwd);
});
document.getElementById("google-signin")?.addEventListener("click", async () => {
    await signinWithGoogle();
});
firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        if (first) {
            alert("You are already logged in... should redirect to editor I guess ;), logging out now");
        }
        else {
            alert("yay... created user! logging out again ;)");
        }
    }
    else {
        setDisplay("createContainer", "");
        setDisplay("loginContainer", "");
    }
});
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
document.getElementById("request-demo")?.addEventListener("click", () => {
    const name = document.getElementById("nameCtrl")?.value;
    const email = document.getElementById("emailCtrl")?.value;
    const demoName = document.getElementById("demoNameCtrl");
    const demoEmail = document.getElementById("demoEmailCtrl");
    const signup = document.getElementById("signupContainer");
    const demo = document.getElementById("demoContainer");
    if (name)
        demoName.value = name;
    if (email)
        demoEmail.value = email;
    signup.style.display = "none";
    demo.style.display = "";
});
document.getElementById("send-request")?.addEventListener("click", () => {
    const signup = document.getElementById("signupContainer");
    const demo = document.getElementById("demoContainer");
    signup.style.display = "";
    demo.style.display = "none";
});
//# sourceMappingURL=createUser.js.map