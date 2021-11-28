// RecipeCard.js
import { deletePrivateRecipe } from '../../backend/private_recipe.js'
class RecipeCard extends HTMLElement {
  constructor () {
    super() // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' })
  }

  set data (data) {
    if (!data) return

    // Used to access the actual data object
    this.json = data

    const style = document.createElement('style')
    const card = document.createElement('article')
    style.innerHTML = `
        * {
          font-family: sans-serif;
          margin: 5;
          padding: 5;
        }

        article {
          align-items: center;
          border: 1px solid rgb(223, 225, 229);
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: repeat(2, 1fr);

          height: 160px;
          width: 400px;
          background-color: LemonChiffon;
          transition: all 0.2s ease;
          user-select: none;
        }

        article:hover {
          border-radius: 8px;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
          transition: all 0.2s ease;
          transform: scale(1.02);
        }

        article > img {
          height: 160px;
          object-fit: cover;
          width: 200px;
          grid-row: 1/ span 3;
          grid-column: 1;
          
        }

        p.title {
          grid-row: 1;
          grid-column: 2;
          
        }
        p:not(.title), span, time {
          color: #70757A;
          font-size: 12px;
          grid-row: 2;
          grid-column: 2;

        }

        button{
          
          grid-column: 2;
        }
      `

    // Grab the title
    const titleText = getTitle(data)
    const title = document.createElement('p')
    title.classList.add('title')
    title.innerText = titleText

    // Grab the thumbnail
    const imageUrl = getImage(data)
    const image = document.createElement('img')
    image.setAttribute('src', imageUrl)
    image.setAttribute('alt', titleText)

    // Grab the total time
    // const totalTime = searchForKey(data, 'totalTime');
    // const time = document.createElement('time');
    // time.innerText = convertTime(totalTime);

    // TODO: Grab the calories

    // Button to add to plan
    // const addButton = document.createElement('button');
    // addButton.innerText = 'Add to plan';
    // addButton.addEventListener('click', () => {
    //   console.log('added to plan');
    // });

    // Button to edit recipe
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit recipe'
    editButton.addEventListener('click', () => {
      window.location.href = 'templateEditRecipe.html' // how to pass in the ID of the recipe?
      localStorage.setItem('currentRecipeData', JSON.stringify(data))
      // TODO: fetch the data that's already on the database, place it in the template textareas

      console.log('edit recipe clicked')
    })

    // Button to delete recipe
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete recipe'
    deleteButton.addEventListener('click', () => {
      console.log('delete recipe clicked')
      // TODO: go to the backend and delete the recipe
      deletePrivateRecipe(data.id)
    })

    // Add all of the elements to the card
    card.appendChild(image)
    card.appendChild(title)
    // card.appendChild(time);
    // card.appendChild(addButton);
    card.appendChild(editButton)
    card.appendChild(deleteButton)
    this.shadowRoot.append(style, card)
  }

  get data () {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json
  }
}

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
  // if (data['@graph']) {
  //   for (let i = 0; i < data['@graph'].length; i++) {
  //     if (data['@graph'][i]['@type'] == 'Recipe') {
  //       if (data['@graph'][i]['name']) return data['@graph'][i]['name'];
  //     };
  //   }
  // }
  return null
}

/**
   * Extract a usable image from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the URL of the image as a string, otherwise null
   */
function getImage (data) {
  // if (data.image?.url)
  if (data.image_url) return data.image_url
  return null
  // if (data.image?.contentUrl) return data.image.contentUrl;
  // if (data.image?.thumbnail) return data.image.thumbnail;
  // if (data['@graph']) {
  //   for (let i = 0; i < data['@graph'].length; i++) {
  //     if (data['@graph'][i]['@type'] == 'ImageObject') {
  //       if (data['@graph'][i]['url']) return data['@graph'][i]['url'];
  //       if (data['@graph'][i]['contentUrl']) return data['@graph'][i]['contentUrl'];
  //       if (data['@graph'][i]['thumbnailUrl']) return data['@graph'][i]['thumbnailUrl'];
  //     };
  //   }
  // }
  // return null;
}

/**
   * Extract the URL from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the URL of
   * @returns {String} If found, it returns the URL as a string, otherwise null
   */
function getUrl (data) {
  if (data.url) return data.url
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Recipe') return data['@graph'][i]['@id']
    }
  };
  return null
}

/**
   * Similar to getUrl(), this function extracts the organizations name from the
   * schema JSON object. It's not in a standard location so this function helps.
   * @param {Object} data Raw recipe JSON to find the org string of
   * @returns {String} If found, it retuns the name of the org as a string, otherwise null
   */
function getOrganization (data) {
  if (data.publisher?.name) return data.publisher?.name
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'WebSite') {
        return data['@graph'][i].name
      }
    }
  };
  return null
}

/**
   * Converts ISO 8061 time strings to regular english time strings.
   * Not perfect but it works for this lab
   * @param {String} time time string to format
   * @return {String} formatted time string
   */
function convertTime (time) {
  let timeStr = ''

  // Remove the 'PT'
  time = time.slice(2)

  const timeArr = time.split('')
  if (time.includes('H')) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'H') return `${timeStr} hr`
      timeStr += timeArr[i]
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] == 'M') return `${timeStr} min`
      timeStr += timeArr[i]
    }
  }

  return ''
}

/**
   * Takes in a list of ingredients raw from imported data and returns a neatly
   * formatted comma separated list.
   * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
   *                              imported data
   * @return {String} the string comma separate list of ingredients from the array
   */
function createIngredientList (ingredientArr) {
  let finalIngredientList = ''

  /**
     * Removes the quantity and measurement from an ingredient string.
     * This isn't perfect, it makes the assumption that there will always be a quantity
     * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
     * For the purposes of this lab you don't have to worry about those cases.
     * @param {String} ingredient the raw ingredient string you'd like to process
     * @return {String} the ingredient without the measurement & quantity
     * (e.g. '1 cup flour' returns 'flour')
     */
  function _removeQtyAndMeasurement (ingredient) {
    return ingredient.split(' ').splice(2).join(' ')
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient)
    finalIngredientList += `${ingredient}, `
  })

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2)
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard)
