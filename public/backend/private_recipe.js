const db = firebase.firestore()

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
 * 
 * @returns user's private recipes
 */
async function getPrivateRecipes () {
  try {
    const user = firebase.auth().currentUser
    const data = []
    await db
      .collection('private_recipe')
      .where('UID', '==', user.uid.toString())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const temp = doc.data()
          temp.id = doc.data().id
          data.push(temp)
        })
      })
      .catch((error) => {
        return error
      })
    return data
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
    const user = firebase.auth().currentUser
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
    if (res.UID != user.uid) {
      throw 'User does not have access, something went wrong!'
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
  await db.collection('private_recipe').add(recipe)
}

/**
 *
 * @param {*} id => Id of recipe that need to update
 * @param {*} new_recipe => this is a JSON
 */
async function updatePrivateRecipe (id, newRecipe) {
  const batch = db.batch()
  const docRef = await db.collection('private_recipe').doc(id.toString())
  await docRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw 'some error'
      }

      for (const att in doc.data()) {
        batch.update(docRef, att, newRecipe[att])
      }
      batch.commit()
    })
    .catch((error) => {
      return error
    })
}

/**
 *
 * @param {*} id
 */
async function deletePrivateRecipe (id) {
  await db.collection('private_recipe').doc(id.toString()).delete()
}
