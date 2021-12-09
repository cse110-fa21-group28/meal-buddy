/**
 * @module app.js
 */

const auth = firebase.auth()

/**
 * Logs in the user with Google authentication
 */
function googleLogIn () {
  const provider = new firebase.auth.GoogleAuthProvider()

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user
      console.log(user)
    })
    .catch(console.log)
}

/**
 * Logs out the user
 */
function googleLogOut () {
  auth.signOut()
    .then(function () {
      console.log('signed out')
      window.location.href = 'index.html'
    })
    .catch(console.log)
}

auth.onAuthStateChanged(user => {
  if (!document.getElementById('whenSignedIn')) {
    return
  }
  if (user) {
    document.getElementById('whenSignedIn').hidden = false
    document.getElementById('whenSignedOut').hidden = true
    document.getElementById('userDetail').innerHTML = `<h3> "Hello"  ${user.displayName} !<h3> <p>User ID: ${user.uid} </p>`
    window.location.href = 'home.html'
  } else {
    document.getElementById('whenSignedIn').hidden = true
    document.getElementById('whenSignedOut').hidden = false
    document.getElementById('userDetail').innerHTML = ''
  }
})
