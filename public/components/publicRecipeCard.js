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
  