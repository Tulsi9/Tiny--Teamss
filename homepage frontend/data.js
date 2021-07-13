
var firebaseConfig = {
    apiKey: "AIzaSyB66ln8uYbstUrhKMJ5t2cY-XabeDvcyy4",
    authDomain: "signin-caba3.firebaseapp.com",
    projectId: "signin-caba3",
    storageBucket: "signin-caba3.appspot.com",
    messagingSenderId: "147817217130",
    appId: "1:147817217130:web:4870901629e6b2c4255e13",
    measurementId: "G-QMGJQGBYV9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var datab  = firebase.database().ref('data');
function UserRegister(){
var email = document.getElementById('eemail').value;
var password = document.getElementById('lpassword').value;
firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    
}).catch(function (error){
    var errorcode = error.code;
    var errormsg = error.message;
});
}
const auth = firebase.auth();
function SignIn(){
    window.location = '/dist/index.html';
    var email = document.getElementById('eemail').value;
    var password = document.getElementById('lpassword').value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch( e => alert(e.msg));
    
}
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var userInfo = datab.push();
    userInfo.set({
        name: getId('fname'),
        email : getId('eemail'),
        password : getId('lpassword')
    });
    alert("Successfully Signed Up");
    console.log("sent");
    document.getElementById('form').reset();
});
function  getId(id){
    return document.getElementById(id).value;
}
