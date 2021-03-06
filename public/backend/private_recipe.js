/**
 * @module private_recipe
 */

const db = firebase.firestore()
const auth = firebase.auth()

/**
 * This is a function that GETs all private recipes that belong to the current user. It will return empty
 * array if current user have no private recipe.
 * @returns user's private recipes
 */
async function getPrivateRecipes () {
  try {
    auth.onAuthStateChanged(user => {
      if (user) {
        const data = []
        firebase.firestore()
          .collection('private_recipe')
          .where('UID', '==', user.uid.toString())
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const temp = doc.data()
              temp.id = doc.data().id
              data.push(temp)
            })
            console.log('hello? did you get here?')
            console.log(data)
            return data
          })
          .catch((error) => {
            return error
          })
      }
    })
  } catch (error) {
    return error
  }
}

/**
 * Gets the requested private recipe
 * @param {String} recipeId
 * @returns the requested recipe data
 */
async function getPrivateRecipe (recipeId) {
  try {
    // Null check
    if (!recipeId) {
      throw 'RecipeID expected!'
    }
    const user = await auth.currentUser
    if (!user) {
      throw 'User not sign in'
    }
    await db
      .collection('private_recipe')
      .doc(recipeId)
      .get()
      .then((docRef) => {
        res = docRef.data()
        if (res.UID !== user.uid) {
          throw 'User does not have access to this recipe, something went wrong!'
        }
        return res
      })
      .catch((error) => {
        return error
      })
  } catch (error) {
    return error
  }
}

/**
 * Addes a private recipe
 * @param {JSON} recipe the JSON containing all the information about the recipe
 */
async function addPrivateRecipe (recipe) {
  // Create with random ID
  try {
    const user = await auth.currentUser
    if (!user) {
      throw 'User not sign in'
    }
    recipe.UID = user.uid
    await db.collection('private_recipe').add(recipe)
  } catch (error) {
    return error
  }
}

/**
 * Updated the specified recipe
 * @param {String} id id of recipe that need to update
 * @param {JSON} new_recipe the JSON of the new recipe
 */
async function updatePrivateRecipe (recipeId, newRecipe) {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        throw 'User not signed in'
      }
      const batch = db.batch()
      const docRef = await db.collection('private_recipe').doc(recipeId.toString())
      await docRef
        .get()
        .then((doc) => {
          for (const att in doc.data()) {
            if (newRecipe[att]) {
              batch.update(docRef, att, newRecipe[att])
            }
          }
          batch.commit()
        })
        .catch((error) => {
          return error
        })
    })
  } catch (error) {
    return error
  }
}

/**
 * Deletes the specified recipe
 * @param {String} id the id of the recipe
 */
async function deletePrivateRecipe (id) {
  try {
    const user = await auth.currentUser
    if (!user) {
      throw 'User not sign in'
    }
    db.collection('private_recipe').doc(id.toString()).delete()
  } catch (error) {
    return error
  }
}

export { getPrivateRecipes, getPrivateRecipe, addPrivateRecipe, deletePrivateRecipe, updatePrivateRecipe }
