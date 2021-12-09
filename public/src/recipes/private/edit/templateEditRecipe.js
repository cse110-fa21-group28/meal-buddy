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

  saveButton.addEventListener('click', async function () {
    firebase.firestore().collection('private_recipe').doc(parsedData.id.toString()).update(obj).then(function () {
      window.location.href = '../myRecipes.html'
    })
  })
}
