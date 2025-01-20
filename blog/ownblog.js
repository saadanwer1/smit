const bloghandler = (event) => {
    event.preventDefault();
    window.location.href = "./publicblog.html";
};

const profilehandler = (event) => {
    event.preventDefault();
    window.location.href = "./myprofile.html";
};


window.bloghandler = bloghandler;
window.profilehandler = profilehandler;

import { db, doc, getDocs, collection, deleteDoc, updateDoc } from './firebase.js';

const fetchOwnBlogs = async () => {
    try {
        const parent = document.querySelector("#parent");
        const userUid = localStorage.getItem("uid");
        const querySnapshot = await getDocs(collection(db, "Blog Data"));
        parent.innerHTML = "";

        querySnapshot.forEach((docSnapshot) => {
            const blogData = docSnapshot.data();
            if (blogData.userUid === userUid) {
                parent.innerHTML += `
                    <div class="card ${blogData.isPrivate ? 'bg-warning' : 'bg-light'}" style="width: 100%;" id="blog-${docSnapshot.id}">
                        <div class="card-body d-flex justify-content-between">
                            <div>
                                <h5 class="card-title">${blogData.Blog}</h5>
                                <p class="card-text">${blogData.isPrivate ? "Private" : "Public"}</p>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-danger me-2 pt-3 deleteBtn" data-id="${docSnapshot.id}">Delete</button>
                                <button class="btn btn-info me-2 pt-3 editBtn" data-id="${docSnapshot.id}">Edit</button>
                            </div>
                        </div>
                    </div>`;
            }
        });

        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const blogId = e.target.getAttribute('data-id');
                deletenotes(blogId);
            });
        });

        const editButtons = document.querySelectorAll(".editBtn");
        editButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const blogId = e.target.getAttribute('data-id');
                updateTodo(blogId);
            });
        });
    } catch (error) {
        console.log("Error fetching own blogs:", error.message);
    }
};

const deletenotes = async (id) => {
    try {
        await deleteDoc(doc(db, "Blog Data", id));
        fetchOwnBlogs();
    } catch (error) {
        console.log("Error deleting blog:", error.message);
    }
};

const updateTodo = async (id) => {
    const updatedValue = prompt("Enter updated value");
    if (!updatedValue) {
        alert("Please enter updated value");
        return;
    }
    try {
        await updateDoc(doc(db, "Blog Data", id), { Blog: updatedValue });
        fetchOwnBlogs();
    } catch (error) {
        console.log("Error updating blog:", error.message);
    }
};

window.fetchOwnBlogs = fetchOwnBlogs;
window.deletenotes = deletenotes;
window.updateTodo = updateTodo;
