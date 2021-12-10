/**
 * @module main
 */

import { Router } from './Router.js'

const recipes = []
const publicRecipes = []

const router = new Router(function () {
  document.querySelector('section.sectionRecipeCards').classList.add('shown')
  document.querySelector('section.sectionRecipeExpand').classList.remove('shown')
})

window.addEventListener('DOMContentLoaded', init)

// Initialize function, begins all of the JS code in this file
async function init () {
  // initializeServiceWorker();
  try {
    await fetchRecipes()
    await fetchPublicRecipes()
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`)
    return
  }

  bindPopstate()
}

/**
 * Fetches the private recipes from the firebase database as json
 * objects and stores them into the public_recipes array
 */
async function fetchRecipes () {
  auth.onAuthStateChanged(user => {
    if (user) {
      firebase.firestore()
        .collection('private_recipe')
        .where('UID', '==', user.uid.toString())
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const temp = doc.data()
            temp.id = doc.id
            recipes.push(temp)
          })
          if (recipes.length >= 1) {
            createRecipeCards()
          }
        })
        .catch((error) => {
          return error
        })
    }
  })
}

/**
 * Fetches the public recipes from the firebase database as json
 * objects and stores them into the publicRecipes array
 */
async function fetchPublicRecipes () {
  await firebase.firestore()
    .collection('public_recipe')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        publicRecipes.push(doc.data())
      })
      if (publicRecipes.length >= 1) {
        createPublicRecipeCards()
      }
    })
    .catch((error) => {
      return error
    })
}

/**
 * Generates the <public-recipe-card> elements from the fetched recipes and
 * appends them to the private recipes page
 */
function createPublicRecipeCards () {
  for (let i = 0; i < publicRecipes.length; i++) {
    const recipeCard = document.createElement('public-recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = publicRecipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    const page = publicRecipes[i].name
    router.addPage(page, function () {
      document.querySelector('.sectionRecipeCards').classList.remove('shown')
      document.querySelector('.sectionRecipeExpand').classList.add('shown')
      document.querySelector('recipe-expand').data = publicRecipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipeCardsWrapper').appendChild(recipeCard)
  }
}

/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards () {
  // Makes a new recipe card
  for (let i = 0; i < recipes.length; i++) {
    const recipeCard = document.createElement('recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    const page = recipes[i].name
    router.addPage(page, function () {
      document.querySelector('.sectionRecipeCards').classList.remove('shown')
      document.querySelector('.sectionRecipeExpand').classList.add('shown')
      document.querySelector('recipe-expand').data = recipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipeCardsWrapper').appendChild(recipeCard)
  }
}

/**
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard (recipeCard, pageName) {
  recipeCard.addEventListener('click', e => {
    if (e.path[0].nodeName !== 'A') {
      router.navigate(pageName)
    }
  })
}

/**
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
 */
function bindPopstate () {
  window.addEventListener('popstate', function (event) {
    if (event.state) {
      console.log('yesbbay')
      router.navigate(event.state.page, true)
    } else {
      router.navigate('home', true)
    }
  })
}
