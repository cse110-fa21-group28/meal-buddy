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

    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.type = 'text/css'
    style.href = '/assets/styles/recipeCard.css'
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
    image.setAttribute('alt', 'recipe-image')


    // Grab the calories
    const calorieText = getCalories(data)
    const calorie = document.createElement('p')
    calorie.classList.add('calories')
    calorie.innerText = calorieText + " calories"


    // Button to edit recipe
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit recipe'
    editButton.classList.add("editButton");
    editButton.addEventListener('click', (e) => {
      e.stopPropagation()
      window.location.href = 'edit/templateEditRecipe.html'
      localStorage.setItem('currentRecipeData', JSON.stringify(data))
      // Takes the user back to the myrecipe page after editing the recipe
    })

    // Button to delete recipe
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete recipe'
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation()
      firebase.firestore().collection('private_recipe').doc(data.id.toString()).delete().then(function () {
        window.location.href = '../private/myRecipes.html'
        // Deletes the recipe by deleting the recipe data's id in the database
        // Automatically refreshes the page after recipe deletion
      })
    })

    // Add all of the elements to the card
    card.appendChild(style);
    card.appendChild(image)
    card.appendChild(title)
    card.appendChild(calorie)
    card.appendChild(editButton)
    card.appendChild(deleteButton)
    
    this.shadowRoot.append(card)
  }

  get data () {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json
  }
}


/**
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the recipe title
   * @returns {String} If found, returns the recipe title
   */
function getTitle (data) {
  if (data.name) return data.name
  return null
}

/**
   * Extract a usable image from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the image
   * @returns {String} If found, returns the URL of the image as a string, otherwise null
   */
function getImage (data) {
  if (data.image_url) return data.image_url
  return null
}

/**
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the calories
   * @returns {String} If found, returns the calories
   */
function getCalories (data) {
  if (data.calories) return data.calories
  return null
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard)
