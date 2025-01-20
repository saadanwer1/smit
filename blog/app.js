const authCheck = () => {
    const userUid = localStorage.getItem("uid");
    console.log("userUid", userUid);
    if (userUid) {
        window.location.replace("./publicblog.html");
    }
}
window.authCheck = authCheck;


import { app, auth, db, doc, getDoc, signInWithEmailAndPassword } from "./firebase.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");

const loginhandler = async () => {
    try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        const uid = response.user.uid;
        console.log("User UID:", uid);
        localStorage.setItem("uid", uid);
        const userData = await getDoc(doc(db, "Blogs", uid));
        console.log("User Data:", userData.data());
        window.location.replace("./publicblog.html");
    } catch (error) {
        console.log("Error:", error.message);
        alert("Error: " + error.code);
    }
};

const buttonhandler = () => {
    window.location.href = "./signup.html";
};

window.loginhandler = loginhandler;
window.buttonhandler = buttonhandler;


