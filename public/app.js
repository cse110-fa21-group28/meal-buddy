const auth = firebase.auth();

function googleLogin() {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(console.log)
}

function googleLogout() {
    auth.signOut()
        .then( function() {
            console.log("signed out")
        })
        .catch(console.log)
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("whenSignedIn").hidden = false;
        document.getElementById("whenSignedOut").hidden = true;
        document.getElementById("userDetail").innerHTML = `<h3> "Hello"  ${user.displayName} !<h3> <p>User ID: ${user.uid} </p>`;
    } else {
            document.getElementById("whenSignedIn").hidden = true;
        document.getElementById("whenSignedOut").hidden = false;
        document.getElementById("userDetail").innerHTML = ``;
    }
        })
