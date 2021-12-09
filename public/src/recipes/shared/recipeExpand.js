/**
 * @module recipeExpand
 */

class RecipeExpand extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Create styles and root element
    const style = document.createElement('style')
    // style.rel = 'stylesheet'
    // style.type = 'text/css'
    // style.href = '../styles/recipeExpand.css'
    const article = document.createElement('article')

    // Fill in styles and root element
    style.innerHTML = `
        article {
          background-color: LemonChiffon;
          box-shadow: 0 0 10px rgb(0 0 0 / 15%);
          margin: 30px auto;
          max-width: 720px;
          padding: 25px;
          transition: all 0.2s ease;
          width: 80%;
        }
        div.rating--wrapper {
          align-items: center;
          column-gap: 5px;
          display: flex;
          justify-items: center;
          margin-top: 10px;
        }
        
        div.rating--wrapper > img {
          height: auto;
          display: inline-block;
          object-fit: scale-down;
          width: 78px;
        }
        header {
          align-items: flex-start;
          column-gap: 10px;
          display: grid;
          grid-template-areas:
           'title title img'
           'meta meta img'
           'desc desc img';
        }
        header p {
          margin: 0;
        }
        header > h1 {
          font-size: 2rem;
          font-weight: 500;
          grid-area: title;
          margin: -10px 0 0 0;
          padding: 0;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin: 35px 0 0 0;
        }
        header > div.meta--wrapper {
          display: grid;
          grid-area: meta;
          margin: 10px 0;
          row-gap: 4px;
        }
        header > div.meta--wrapper p,
        main > div.rating--wrapper {
          color: gray;
          font-style: italic;
        }
        header img.thumbnail {
          aspect-ratio: 1;
          grid-area: img;
          object-fit: cover;
          overflow: hidden;
          width: 230px;
        }
        header p.description {
          height: 62px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        main > .section--ingredients,
        main > .section--instructions {
          font-size: 1.1rem;
        }
        span.rating-total {
          margin-left: -2px;
        }
        ol, ul {
          margin-top: 10px;
        }
        ol li:not(:first-child) {
          margin-top: 15px;
        }
        ol li::marker {
          padding-right: 5px;
        }
        ul li {
          padding-left: 2px;
        }
        ul li:not(:first-child) {
          margin-top: 8px;
        }
      `
    article.innerHTML = `
        <header>
          <h1></h1>
          <div class="meta--wrapper">
            <p>calories: <span class="meta--calories"></span></p>
          </div>
          <p class="description"></p>
          <img src="" alt="" class="thumbnail" />
        </header>
        <main>
          <section class="section--ingredients">
            <h2>INGREDIENTS</h2>
            <ul></ul>
          </section>
          <section class="section--instructions">
            <!--<h2>INSTRUCTIONS</h2>-->
            <ol></ol>
          </section>
        </main>
      `

    // Append elements to the shadow root
    this.shadowRoot.append(style, article)
  }

  /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     */
  set data (data) {
    this.json = data

    // Reset HTML
    this.shadowRoot.querySelector('article').innerHTML = `
        <header>
          <h1></h1>
          <div class="meta--wrapper">
            <p>calories: <span class="meta--calories"></span></p>
          </div>
          <p class="description"></p>
          <img src="" alt="" class="thumbnail" />
        </header>
        <main>
          <section class="section--ingredients">
            <h2>INGREDIENTS</h2>
            <ul></ul>
          </section>
          <section class="section--instructions">
            <h2>INSTRUCTIONS</h2>
            <ol></ol>
          </section>
        </main>
      `

    // Set Title
    const title = getTitle(data).toUpperCase()
    this.shadowRoot.querySelector('header > h1').innerHTML = title

    // Set Calories
    const calories = getCalories(data)
    this.shadowRoot.querySelector('.meta--calories').innerHTML = calories

    // Set Description
    const description = getDescription(data)
    this.shadowRoot.querySelector('p.description').innerHTML = description

    // Set Image
    const imgSrc = getImage(data)
    const img = this.shadowRoot.querySelector('img.thumbnail')
    img.setAttribute('src', imgSrc)
    img.setAttribute('alt', title)

    // Set Ingredients
    const ingredients = getIngredients(data)
    ingredients.forEach(ingredient => {
      const listItem = document.createElement('li')
      listItem.innerHTML = ingredient
      this.shadowRoot.querySelector('.section--ingredients > ul').append(listItem)
    })

    // Set Instructions / URL
    const instructions = getInstructions(data)
    const url = getUrl(data)
    if (instructions) {
      instructions.forEach(instruction => {
        const listItem = document.createElement('li')
        listItem.innerHTML = instruction
        this.shadowRoot.querySelector('.section--instructions > ol').append(listItem)
      })
    } else {
      const header = this.shadowRoot.querySelector('.section--instructions > h2')
      const list = this.shadowRoot.querySelector('.section--instructions > ol')
      header.innerHTML = 'Recipe URL'
      list.parentElement.removeChild(list)
      const recipe_url = document.createElement('a')
      recipe_url.setAttribute('href', url)
      recipe_url.setAttribute('target', '_blank')
      recipe_url.innerHTML = url
      this.shadowRoot.querySelector('.section--instructions').append(recipe_url)
    }
  }

  /**
     * Returns the object of the currect recipe being used.
     */
  get data () {
    return this.json
  }
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
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe title
   */
function getTitle (data) {
  if (data.name) return data.name
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
   * Extract the ingredients of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe ingredients
   */
function getIngredients (data) {
  if (data.recipe_ingredient) return data.recipe_ingredient

  return null
}

/**
 * Extract the url of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the url of
 * @returns {String} If found, returns the url of the recipe
 */
function getUrl (data) {
  if (data.recipe_url) return data.recipe_url
  return null
}

customElements.define('recipe-expand', RecipeExpand)
