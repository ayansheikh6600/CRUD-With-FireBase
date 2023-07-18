import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();



    document.getElementById("register").addEventListener("click", function () {
        // console.log("aaaa")
        var email = document.getElementById("QEmail").value;
        var password = document.getElementById("QPassword").value;
        //For new registration
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("Registration successfully!!");
                var userObject = {
                            email,
                            password,
                        }
      
                        var getUsers = JSON.parse(localStorage.getItem("users"))
                        if (getUsers === null) {
                            var arr = []
                            arr.push(userObject)
                            console.log("first user signup")
                            localStorage.setItem("users", JSON.stringify(arr))
                            alert("user signup")
                            window.location.replace("./dashboard.html")
                        }
                    
                })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage);
                alert(error);
            });
      });

      document.getElementById("LoginBtn").addEventListener("click", function() {
        var email =  document.getElementById("Email").value;
        var password = document.getElementById("Password").value;
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
    
          
          const user = userCredential.user;
          console.log(user);
          alert(user.email+" Login successfully!!!");
          window.location.replace("./dashboard.html")
          var userObject = {
            email,
            password,
        }
    
        var getUsers = JSON.parse(localStorage.getItem("users"))
        if (getUsers === null) {
            var arr = []
            arr.push(userObject)
            console.log("first user signup")
            localStorage.setItem("users", JSON.stringify(arr))
        }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(errorMessage);
        });		  		  
    });



    const signupBtn = document.querySelector(".signup")
    const loginBtn = document.querySelector(".login")
    const loginDiv = document.querySelector("#loginDiv")
    const SignupDiv = document.querySelector("#SignupDiv")

    signupBtn.addEventListener("click", signupptn)
    loginBtn.addEventListener("click", login)
    function signupptn(){
      loginDiv.classList.add("wowzors")
      SignupDiv.classList.add("wowzors")

      loginDiv.style.display = "none"
      SignupDiv.style.display = "block"


    }
    function login(){
      loginDiv.classList.remove("wowzors")
      SignupDiv.classList.remove("wowzors")
      loginDiv.classList.add("wowzors")
      SignupDiv.classList.add("wowzors")

      SignupDiv.style.display = "none"
      loginDiv.style.display = "block"
      
    }


