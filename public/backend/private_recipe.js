const db = firebase.firestore()
const auth = firebase.auth()

function private_recipe (UID, name, recipe_ingredient, calories, category, description, image_url) {
  this.UID = UID
  this.name = name
  this.recipe_ingredient = recipe_ingredient
  this.description = description
  this.calories = calories
  this.image_url = image_url
  this.category = category
}

/**
 * This is a function that GETs all private recipes that belong to the current user. It will return empty
 * array if current user have no private recipe.
 * @returns user's private recipes
 */
async function getPrivateRecipes () {
  try {
    auth.onAuthStateChanged(user => {
      if (!user) {
        throw 'User not login'
      } else {
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
 *
 * @param {*} recipeId
 * @returns recipe with recipeId
 */
async function getPrivateRecipe (recipeId) {
  try {
    // Null check
    if (!recipeId) {
      throw 'RecipeID expected!'
    }
    const user = await auth.currentUser
    let res
    await db
      .collection('private_recipe')
      .doc(recipeId)
      .get()
      .then((docRef) => {
        res = docRef.data()
      })
      .catch((error) => {
        return error
      })
    if (!res) {
      return res
    } else if (res.UID != user.uid) {
      throw 'User does not have access to this recipe, something went wrong!'
    }
    return res
  } catch (error) {
    return error
  }
}

/**
 *
 * @param {*} recipe => this is  JSON
 */
async function addPrivateRecipe (recipe) {
  // Create with random ID
  try {
    const user = firebase.auth().currentUser
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
 *
 * @param {*} id => Id of recipe that need to update
 * @param {*} new_recipe => this is a JSON
 */
async function updatePrivateRecipe (recipeId, newRecipe) {
  try {
    const user = await auth.currentUser
    const batch = db.batch()
    const docRef = await db.collection('private_recipe').doc(recipeId.toString())
    await docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw 'No recipe found with recipeId = ' + recipeId
        }

        for (const att in doc.data()) {
          batch.update(docRef, att, newRecipe[att])
        }
        batch.commit()
      })
      .catch((error) => {
        return error
      })
  } catch (error) {
    return error
  }
}

/**
 *
 * @param {*} id
 */
async function deletePrivateRecipe (id) {
  await db.collection('private_recipe').doc(id.toString()).delete()
}

export { getPrivateRecipes, getPrivateRecipe, addPrivateRecipe, deletePrivateRecipe, updatePrivateRecipe }
