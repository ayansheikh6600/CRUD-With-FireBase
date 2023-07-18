import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, linkWithCredential } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAod5-MTWvr6EUsq8B3aHB4vsgXRrNW5ok",
    authDomain: "crud-operation-1b65c.firebaseapp.com",
    projectId: "crud-operation-1b65c",
    storageBucket: "crud-operation-1b65c.appspot.com",
    messagingSenderId: "846700281172",
    appId: "1:846700281172:web:f5000874cc54e2265bdcc1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app)


document.getElementById("logout").addEventListener("click", function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        alert('Sign-out successful.');
        window.location.replace("./index.html")
        localStorage.clear()
    }).catch((error) => {
        // An error happened.
        console.log('An error happened.');
    });
});


const ulParent = document.getElementById("ulParent")
const input = document.getElementById("input")
const desc = document.getElementById("desc")
const addPost = document.getElementById("addTodo")
const Postcollection = collection(db, "Posts")

addPost.addEventListener("click", addPosts)
window.addEventListener("load", getPosts)

async function getPosts() {
    try {
        const arr = []
        const querySnapshot = await getDocs(Postcollection)
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, doc.data())
            const todoValue = doc.data().todo
            const des = doc.data().desc
            console.log(des, todoValue)
            createUI(todoValue, des, doc.id)
        });
    } catch (error) {
        console.log(error.message, "error")
        alert(error.message)
    }
}

async function addPosts() {
    try {
        if (!input.value || !desc.value) {
            alert("Enter Value")
            return
        }
        const data = {
            todo: input.value,
            desc: desc.value
        }
        const docRef = await addDoc(Postcollection, data)
        console.log("Document written with ID: ", docRef.id);
        createUI(input.value, desc.value, docRef.id)
        input.value = ""
        desc.value = ""
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}

async function editTodo(el) {
    // console.log("editTodo()", el.target.parentNode.parentNode.
    //     firstChild.nodeValue)
    try {

        var li = el.target.parentNode.firstElementChild
        var descr = el.target.parentNode.children[1]
        console.log(descr)
        var placeHolder = li.firstChild.nodeValue
        var editValue = prompt("Edit Title", placeHolder)
        console.log(li.id, "id")
        var eDesc = prompt("Edit Des", descr.firstChild.nodeValue

        )

        const updateData = await updateDoc(doc(db, "Posts", li.id), {
            todo: editValue,
            desc: eDesc
        })

        console.log("editValue", editValue)
        li.firstChild.nodeValue = editValue
        descr.firstChild.nodeValue = eDesc

    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }


}


function createUI(todoValue, decvalue, id) {

    const todoUI = `
    <div id="Card-div">
                <div class="card mt-3 ms-2" style="width: 20rem;">
                    <div class="card-body">
                        <h5 id="${id}" class="card-title">${todoValue}</h5>
                        <p id="${id}" class="card-text">${decvalue}</p>
                        <button id="editBtn" class="btn edit-btn editBtn">Edit</button>
                        <button id="DeletPost" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
`
    ulParent.innerHTML += todoUI

    const editBtn = document.querySelector(".editBtn")
    const DeletPost = document.querySelector("#DeletPost")
editBtn.addEventListener("click", editTodo)
DeletPost.addEventListener("click", Delet)
    
    

}
async function Delet(el){
    try{
        console.log("hi")
    const postId = el.target.parentNode.firstElementChild.id

     await deleteDoc(doc(db, "Posts", postId))
    window.location.reload();
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }


}

console.log(ulParent)