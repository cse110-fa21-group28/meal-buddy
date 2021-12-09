// main.js

/**
  @module main
 */

import { getPrivateRecipes } from '../../backend/private_recipe.js'

import { Router } from './Router.js'

const recipes = []

const public_recipes = []

const recipeData = {} // You can access all of the Recipe Data from the JSON files in this variable

const router = new Router(function () {
  document.querySelector('section.section--recipe-cards').classList.add('shown')
  document.querySelector('section.section--recipe-expand').classList.remove('shown')
})

window.addEventListener('DOMContentLoaded', init)
let flag = false

// Initialize function, begins all of the JS code in this file
async function init () {
  console.log('apple')
  // initializeServiceWorker();

  try {
    await fetchRecipes();
    console.log('banana')
    await fetchPublicRecipes();
    console.log('strawberry')
    flag = true
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`)
    return
  }

  // createRecipeCards();
  bindPopstate()
}

/**
 * Fetches the private recipes from the firebase database as json
 * objects and stores them into the public_recipes array
 */
async function fetchRecipes () {
  // TODO: call getPrivateRecipes() instead of this
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw 'User not login'
    } else {
      const data = []
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
        });
      }
  })
}

/**
 * Fetches the public recipes from the firebase database as json
 * objects and stores them into the public_recipes array
 */
async function fetchPublicRecipes() {
  await firebase.firestore()
  .collection('public_recipe')
  .get()
  .then((querySnapshot) => {
    // const tempDoc = [];
    querySnapshot.forEach((doc) => {
      console.log(1, doc.data());
      console.log('asldifkhasdf')
      public_recipes.push(doc.data());
    })
    if (public_recipes.length >= 1) {
      createPublicRecipeCards()
    }
  })
  .catch((error) => {
    return error;
  });
}

/**
 * Generates the <public-recipe-card> elements from the fetched recipes and
 * appends them to the private recipes page
 */
function createPublicRecipeCards() {
  // console.log(recipes)
  for (let i = 0; i < public_recipes.length; i++) {
    const recipeCard = document.createElement('public-recipe-card')
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    console.log(public_recipes[i]);
    recipeCard.data = public_recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    const page = public_recipes[i].name
    router.addPage(page, function () {
      document.querySelector('.section--recipe-cards').classList.remove('shown')
      document.querySelector('.section--recipe-expand').classList.add('shown')
      document.querySelector('recipe-expand').data = public_recipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipe-cards--wrapper').appendChild(recipeCard)
  }
}

/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the private recipes page
 */
function createRecipeCards () {
  // Makes a new recipe card
  console.log(recipes)
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
      document.querySelector('.section--recipe-cards').classList.remove('shown')
      document.querySelector('.section--recipe-expand').classList.add('shown')
      document.querySelector('recipe-expand').data = recipes[i]
    })

    bindRecipeCard(recipeCard, page)
    document.querySelector('.recipe-cards--wrapper').appendChild(recipeCard)
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
    if (e.path[0].nodeName == 'A') return
    else{
      router.navigate(pageName)
      console.log("lolbby")
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
      console.log("yesbbay")
      router.navigate(event.state.page, true)
    } else {
      router.navigate('home', true)
    }
  })
}
