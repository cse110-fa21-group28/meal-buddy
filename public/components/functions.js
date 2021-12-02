module.exports = { getTitle, getImage, searchForKey, getIngredients, getInstructions, getCalories, getDescription };

/**
   * Recursively search for a key nested somewhere inside an object
   * @param {Object} object the object with which you'd like to search
   * @param {String} key the key that you are looking for in the object
   * @returns {*} the value of the found key
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
  
  /**
     * Extract the title of the recipe from the given recipe schema JSON obejct
     * @param {Object} data Raw recipe JSON to find the image of
     * @returns {String} If found, returns the recipe title
     */
  function getTitle (data) {
    if (data.name) return data.name
    return null
  }
  
  /**
     * Extract a usable image from the given recipe schema JSON object
     * @param {Object} data Raw recipe JSON to find the image of
     * @returns {String} If found, returns the URL of the image as a string, otherwise null
     */
  function getImage (data) {
    if (data.image_url) return data.image_url
    return null
  }

  /**
   * Extract the ingredients of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe ingredients
   */
  function getIngredients (data) {
    if (data.recipe_ingredient) return data.recipe_ingredient
    return null
  }

/**
   * Extract the instructions of the recipe from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the instructions of
   * @returns {Array} If found, returns the recipe instructions
   */
  function getInstructions (data) {
    if (data.instructions) return data.instructions
    return null
  }

/**
   * Extract the calories of the recipe from the given recipe JSON object
   * @param {Object} data Raw recipe JSON to find the calories of
   * @returns {Number} If found, returns the calories of the recipe
   */
 function getCalories (data) {
    if (data.calories) return data.calories
    return null
  }
  
  /**
     * Extract the description of the recipe from the given recipe schema JSON obejct
     * @param {Object} data Raw recipe JSON to find the image of
     * @returns {String} If found, returns the recipe description
     */
  function getDescription (data) {
    if (data.description) return data.description
    return null
  }
  