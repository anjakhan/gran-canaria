var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
import { signinWithGoogle, createUser, firebase } from "./code/firebase";
function setDisplay(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = value;
    }
}
let first = true;
(_a = document.getElementById("createAccountCtrl")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const name = (_f = document.getElementById("nameCtrl")) === null || _f === void 0 ? void 0 : _f.value;
    const email = (_g = document.getElementById("emailCtrl")) === null || _g === void 0 ? void 0 : _g.value;
    const pwd = (_h = document.getElementById("passwordCtrl")) === null || _h === void 0 ? void 0 : _h.value;
    first = false;
    yield createUser(name, email, pwd);
}));
(_b = document.getElementById("google-signin")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield signinWithGoogle();
}));
firebase.auth().onAuthStateChanged(function (user) {
    return __awaiter(this, void 0, void 0, function* () {
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
});
(_c = document.getElementById("eye")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
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
(_d = document.getElementById("request-demo")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    var _a, _b;
    const name = (_a = document.getElementById("nameCtrl")) === null || _a === void 0 ? void 0 : _a.value;
    const email = (_b = document.getElementById("emailCtrl")) === null || _b === void 0 ? void 0 : _b.value;
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
(_e = document.getElementById("send-request")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    const signup = document.getElementById("signupContainer");
    const demo = document.getElementById("demoContainer");
    signup.style.display = "";
    demo.style.display = "none";
});
//# sourceMappingURL=createUser.js.map