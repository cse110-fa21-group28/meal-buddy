/**
 * @module public_recipe
 */

/**
 * Initializes the recipe JSON object
 * @param {*} name the name of the recipe
 * @param {*} recipeCategory the categories of the recipe
 * @param {*} description the description of the recipe
 * @param {*} calories the calories of the recipe
 * @param {*} imageUrl the url to the image of the food
 * @param {*} recipeUrl the url to the official recipe page
 * @param {*} recipe_ingredient the ingredients of the recipe
 */

function public_recipe (name, recipeCategory, description, calories, imageUrl, recipeUrl, recipeIngredient) {
  this.name = name
  this.recipeCategory = recipeCategory
  this.description = description
  this.calories = calories
  this.imageUrl = imageUrl
  this.recipeUrl = recipeUrl
  this.recipeIngredient = recipeIngredient
}

const db = firebase.firestore()

/**
 * Gets a specific public recipe
 * @param {String} id the id of the public recipe
 * @returns the data of the request public recipe
 */
async function get_public_recipe (id) {
  const res = db.collection('public_recipe').doc(id)
  const doc = await res.get()
  if (!doc.exists) {
    console.log('No such document!')
  } else {
    console.log('hi')
    return doc.data()
  }
}
