// Handles login and logout for both pages
function handleLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
        });
}

function handleLogout() {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
}

// OnAuthStateChanged listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('content').style.display = 'block';
    } else {
        showLoginModal();
    }
});
