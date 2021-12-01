// import { updatePrivateRecipe } from './backend/private_recipe.js'
window.addEventListener('DOMContentLoaded', init)

let title, img, calorie, descr, ings, instrucs // maybe add cook time
const obj = {}
const data = localStorage.currentRecipeData
const parsedData = JSON.parse(data)
console.log(parsedData)

function init () {
  const titleInput = document.getElementById('titleInput')
  titleInput.value = parsedData.name
  const imgUrlInput = document.getElementById('imgUrlInput')
  imgUrlInput.value = parsedData.image_url
  const calorieInput = document.getElementById('calorieInput')
  calorieInput.value = parsedData.calories
  const descriptionInput = document.getElementById('descriptionInput')
  descriptionInput.value = parsedData.description
  const ingredientsInput = document.getElementById('ingredientsInput')
  ingredientsInput.value = parsedData.recipe_ingredient
  const instructionsInput = document.getElementById('instructionsInput')
  instructionsInput.value = parsedData.instructions
  const saveButton = document.getElementById('saveButton')

  titleInput.addEventListener('input', function () {
    title = titleInput.value
    obj.name = title
  })
  imgUrlInput.addEventListener('input', function () {
    img = imgUrlInput.value
    obj.image_url = img
  })
  calorieInput.addEventListener('input', function () {
    calorie = calorieInput.value
    obj.calories = calorie
  })
  descriptionInput.addEventListener('input', function () {
    descr = descriptionInput.value
    obj.description = descr
  })
  ingredientsInput.addEventListener('input', function () {
    ings = ingredientsInput.value.split('\n')
    obj.recipe_ingredient = ings
  })
  instructionsInput.addEventListener('input', function () {
    instrucs = instructionsInput.value.split('\n')
    obj.instructions = instrucs
  })

  saveButton.addEventListener('click', function () {
    
    console.log('The JSON Object: ' + JSON.stringify(obj))
    updatePrivateRecipe(parsedData.id, obj)

    // Does this reload the page? Fetch the new data from database?

    // window.location.href = "my-recipes.html";
  })
}

async function updatePrivateRecipe (recipeId, newRecipe) {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        throw 'User not signed in'
      }
      const db = firebase.firestore()
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
