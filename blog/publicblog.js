const ownhandler = (event) => {
    event.preventDefault();
    window.location.href = "./ownblog.html";
};

const profilehandler = (event) => {
    event.preventDefault();
    window.location.href = "./myprofile.html";
};

window.ownhandler = ownhandler;
window.profilehandler = profilehandler;



import { auth, db, doc, setDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, onAuthStateChanged, getDoc } from './firebase.js';

const authDiv = document.querySelector("#authDiv");
const blogDiv = document.querySelector("#blogDiv");

const authCheck = async () => {
    const userUid = localStorage.getItem("uid");
    if (!userUid) {
        window.location.replace("./index.html");
    } else {
        const userData = await getDoc(doc(db, "Blogs", userUid));
        console.log("User Data:", userData.data());
    }
};
window.authCheck = authCheck;

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("uid", user.uid);
        authDiv.style.display = "none";
        blogDiv.style.display = "block";
        fetchData();
    } else {
        authDiv.style.display = "block";
        blogDiv.style.display = "none";
        localStorage.removeItem("uid");
    }
});

const addTodo = async () => {
    try {
        const inputValue = document.querySelector("#inputValue");
        const privateCheckbox = document.querySelector("#privateCheckbox");
        if (!inputValue.value) {
            alert("Please enter a blog.");
            return;
        }

        const blogObj = {
            Blog: inputValue.value,
            isPrivate: privateCheckbox.checked,
            userUid: localStorage.getItem("uid")
        };
        await addDoc(collection(db, "Blog Data"), blogObj);
        fetchData();
    } catch (error) {
        console.log("Error:", error.message);
    }
};
const fetchData = async () => {
    try {
        const parent = document.querySelector("#parent");
        const userUid = localStorage.getItem("uid");
        const querySnapshot = await getDocs(collection(db, "Blog Data"));
        parent.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const blogData = doc.data();
            
            if (blogData.isPrivate && blogData.userUid === userUid) {
                parent.innerHTML += `
                    <div class="card ${blogData.isPrivate === true ? 'bg-primary' : 'border-secondary-subtle rounded-3'}" style="width: 100%;">
                        <div class="card-body d-flex justify-content-between">
                            <div>
                                <h5 class="card-title">${blogData.Blog}</h5>
                                <p class="card-text">${blogData.isPrivate ? "Private" : "Public"}</p>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-danger me-2 pt-3" onclick="deletenotes('${doc.id}')">Delete</button>
                                <button class="btn btn-info me-2 pt-3" onclick="updateTodo(this)" id="${doc.id}">Edit</button>
                            </div>
                        </div>
                    </div>`;
            } else if (!blogData.isPrivate) {
                parent.innerHTML += `
                    <div class="card ${blogData.isPrivate === true ? 'bg-warning' : 'bg-light'}" style="width: 100%;">
                        <div class="card-body d-flex justify-content-between">
                            <div>
                                <h5 class="card-title">${blogData.Blog}</h5>
                                <p class="card-text">${blogData.isPrivate ? "Private" : "Public"}</p>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-danger me-2 pt-3" onclick="deletenotes('${doc.id}')">Delete</button>
                                <button class="btn btn-info me-2 pt-3" onclick="updateTodo(this)" id="${doc.id}">Edit</button>
                            </div>
                        </div>
                    </div>`;
            }
        });
    } catch (error) {
        console.log("Error fetching blogs:", error.message);
    }
};



const deletenotes = async (id) => {
    await deleteDoc(doc(db, "Blog Data", id));
    fetchData();
};

const updateTodo = async (ele) => {
    const updatedValue = prompt("Enter updated value:");
    if (updatedValue) {
        await updateDoc(doc(db, "Blog Data", ele.id), { Blog: updatedValue });
        fetchData();
    } else {
        alert("Please enter updated value.");
    }
};

window.addTodo = addTodo;
window.fetchData = fetchData;
window.updateTodo = updateTodo;
window.deletenotes = deletenotes;