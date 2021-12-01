import { addPrivateRecipe } from './backend/private_recipe.js'
window.addEventListener('DOMContentLoaded', init)

let title, img, calorie, descr, ings, instrucs // MAYBE: add cook time?
const obj = {}

async function init () {
  const titleInput = document.getElementById('titleInput')
  const imgUrlInput = document.getElementById('imgUrlInput')
  const calorieInput = document.getElementById('calorieInput')
  const descriptionInput = document.getElementById('descriptionInput')
  const ingredientsInput = document.getElementById('ingredientsInput')
  const instructionsInput = document.getElementById('instructionsInput')
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
    if (Object.keys(obj).length == 6) {
      addPrivateRecipe(obj)
        .then((val) => {
          console.log(val)
          window.location.href = 'my-recipes.html'
        })
    } else {
      alert('Error: Not all the fields are filled out!')
    }
  })
}
