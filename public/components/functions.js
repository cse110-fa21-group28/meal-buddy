module.exports = { getTitle, getImage, searchForKey, createIngredientList, 
                  getIngredients, getInstructions, getCalories, getDescription, getUrl };


/*
========================= recipeCard.js functions =========================
*/

 function searchForKey (object, key) {
    let value
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k]
        return true
      }
      if (object[k] && typeof object[k] === 'object') {
        value = searchForKey(object[k], key)
        return value !== undefined
      }
    })
    return value
  }
  
  function getTitle (data) {
    if (data.name) return data.name
    return null
  }
  
  function getImage (data) {
    if (data.image_url) return data.image_url
    return null
  }

  function createIngredientList (ingredientArr) {
    let finalIngredientList = ''
    function _removeQtyAndMeasurement (ingredient) {
      return ingredient.split(' ').splice(2).join(' ')
    }
    ingredientArr.forEach(ingredient => {
      ingredient = _removeQtyAndMeasurement(ingredient)
      finalIngredientList += `${ingredient}, `
    })
    return finalIngredientList.slice(0, -2)
  }



/*
========================= recipeExpand.js functions =========================
*/

  function getIngredients (data) {
    if (data.recipe_ingredient) return data.recipe_ingredient
    return null
  }

  function getInstructions (data) {
    if (data.instructions) return data.instructions
    return null
  }

 function getCalories (data) {
    if (data.calories) return data.calories
    return null
  }

  function getDescription (data) {
    if (data.description) return data.description
    return null
  }
  
  function getUrl (data) {
    if(data.recipe_url) return data.recipe_url;
  
    return null;
  }