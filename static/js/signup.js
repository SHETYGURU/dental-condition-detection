const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);


const auth = firebase.auth(); // Initialize Authentication

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the form from submitting

    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const passw = document.getElementById("pwd").value;

    // Check if any of the fields are empty before proceeding
    if (!user || !email || !phone || !passw) {
        alert("Please fill in all fields");
        return;
    }
    
    // Check if the email already exists in Firestore
    console.log("Checking email:", email);
    const exists = checkEmailExists(email);

    // After querying Firestore in checkEmailExists
    exists.then((exists) => {
        console.log("Email exists:", exists);
        if (!exists) {
            createUser(user, email, phone, passw);
        } else {
            alert("This email already exists. Please use a different email.");
        }
    });
});
function checkEmailExists(email) {
    const usersRef = db.collection("Users");
    return usersRef
        .where("Email", "==", email)
        .get()
        .then((querySnapshot) => {
            
            return !querySnapshot.empty;
            
        })
        .catch((error) => {
            console.error("Error checking email:", error);
            return false;
        });
}
async function createUser(user, email, phone, passw) {
    try {
        // Create the user in Firebase Authentication
        const userCredential = await auth.createUserWithEmailAndPassword(email, passw);
        const userId = userCredential.user.uid;
        alert(phone)
        // Store additional user data in Firestore
        const usersRef = db.collection("Users");
        await usersRef.doc(email).set({
            UserName: user,
            Email: email,
            Phone: phone,
        });
        alert("Signup successful!");
        console.log("User created and data stored successfully.");
    } catch (error) {
        console.error("Error creating user and storing data:", error);
        alert("This account already exists.");
    }
}

// document.getElementById("google-signin").addEventListener("click", async () => {
//     try {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         const result = await auth.signInWithPopup(provider);
//         const user = result.user;
        
//         const exists = await checkEmailExists(user.email);

//         if (!exists) {
//             createUser(user.displayName, user.email, user.phone,"google-signin"); // You might not have access to phone and password from Google Sign-In
//             // alert("Signup successful!");
//         } else {
//             alert("This account already exists.");
//         }
//     } catch (error) {
//         console.error("Error signing in with Google:", error);
//         alert("An error occurred. Please try again later.");
//     }
// });