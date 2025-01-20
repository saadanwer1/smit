const authCheck = () => {
    const userUid = localStorage.getItem("uid");
    console.log("userUid", userUid);
    if (userUid) {
        window.location.replace("./publicblog.html");
    }
}
window.authCheck = authCheck;

import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./firebase.js";

const firstname = document.querySelector("#firstname");
const surname = document.querySelector("#surname");
const dob = document.querySelector("#dob");
const gender = document.querySelector("#gender");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const signuphandler = async () => {
    try {
        console.log("test1");
        if (!email.value || !password.value || !firstname.value || !surname.value || !gender.value || !dob.value) {
            alert("Please fill in all the fields.");
            return;
        }
        console.log("test2");
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log(response);
        const uid = response.user.uid;
        console.log("User created with UID:", uid);
        
        await setDoc(doc(db, "Blogs", uid), {
            Firstname: firstname.value,
            Surname: surname.value,
            DOB: dob.value,
            Gender: gender.value,
            Email: email.value
        });

        window.location.href = "./index.html";
    } catch (error) {
        console.log("Error:", error.message);
        alert("Error: " + error.code);
    }
};

const button2handler = () => {
    window.location.href = "./index.html"; 
};

window.signuphandler = signuphandler;
window.button2handler = button2handler;



