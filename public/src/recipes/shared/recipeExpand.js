/**
 * @module recipeExpand
 */

class RecipeExpand extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Create styles and root element
    const styles = document.createElement('link')
    styles.rel = 'stylesheet'
    styles.type = 'text/css'
    styles.href = '/assets/styles/recipeExpand.css'
    const article = document.createElement('article')

    // Fill in styles and root element
    article.innerHTML = `
          <body>
          <header>
            <h1></h1>
            
            <img src="" alt="" class="thumbnail" />
            <p class="description"></p>
            <div>
              <p> Calories: <span class="meta--calories"></span></p>
              <button> + Add to plan</button>
            </div>
          </header>
          <hr>
          <main>
            <section class="section--ingredients">
              <h2>Ingredients</h2>
              <ul></ul>
            </section>
            <section class="section--instructions">
              <h2>Instructions</h2>
              <ol></ol>
            </section>
          </main>
        </body>
      `

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article)
  }

  /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     */
  set data (data) {
    this.json = data

    // Reset HTML
    this.shadowRoot.querySelector('article').innerHTML = `
        <body>
          <header>
            <h1></h1>
            
            <img src="" alt="" class="thumbnail" />
            <p class="description"></p>
            <div>
              <p> Calories: <span class="meta--calories"></span></p>
              <button> + Add to plan</button>
            </div>
          </header>
          <hr>
          <main>
            <section class="section--ingredients">
              <h2>Ingredients</h2>
              <ul></ul>
            </section>
            <section class="section--instructions">
              <h2>Instructions</h2>
              <ol></ol>
            </section>
          </main>
        </body>
      `

    // Set Title
    const title = getTitle(data)
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
