// publicRecipeCard.js
class PublicRecipeCard extends HTMLElement {
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
  
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = '../styles/recipeCard.css' 
      const card = document.createElement('article')
      
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
  
      // Add all of the elements to the card
      card.appendChild(image)
      card.appendChild(title)
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
  
  // Define the Class so you can use it as a custom element
  customElements.define('public-recipe-card', PublicRecipeCard)
  