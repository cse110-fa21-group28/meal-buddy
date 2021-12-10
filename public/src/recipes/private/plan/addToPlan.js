const recipes = []

let selectedCard = null;
let selectedRecipe = null;


// let button = document.getElementById('test2Button');
// button.addEventListener('click', () => {
//   init();
// })

window.addEventListener('DOMContentLoaded', init)
let flag = false

// Initialize function, begins all of the JS code in this file
async function init () {
  // initializeServiceWorker();
  const days = document.getElementsByClassName("day");
  for(let i = 0; i < days.length; i++){
      days[i].addEventListener('click', function(){    
        let recipeNewDay = selectedRecipe;
        if(recipeNewDay.days[i]){
          recipeNewDay.days[i] = false;
          days[i].style.backgroundColor = "white"  
        }
        else{
          recipeNewDay.days[i] = true;
          days[i].style.backgroundColor = "#d1ffcf"  
        }
        firebase.firestore().collection('private_recipe').doc(selectedRecipe.id.toString()).update(recipeNewDay)
      })
  }

  try {
    await fetchRecipes();
    flag = true
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`)
    return
  }
}

/**
 * Loading JSON into a JS file is oddly not super straightforward (for now), so
 * I built a function to load in the JSON files for you. It places all of the recipe data
 * inside the object recipeData like so: recipeData{ 'ghostcookies': ..., 'birthdayCake': ..., etc }
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
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards () {
  // Makes a new recipe card
  console.log(recipes)
  for (let i = 0; i < recipes.length; i++) {
    const recipeCard = document.createElement('plan-recipe-card')
    console.log(recipeCard)
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipes[i]

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'

    bindRecipeCard(recipeCard, recipes[i])
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
function bindRecipeCard (recipeCard, recipe) {
  recipeCard.addEventListener('click', e => { 
    selectedRecipe = recipe;
    const days = document.getElementsByClassName("day");
    for(let i = 0; i < days.length; i++){ 
      days[i].style.backgroundColor = "white"   
    }
    if(selectedCard != null){
      selectedCard.style.borderStyle = "none";
      
    }
    selectedCard = recipeCard;
    recipeCard.style.borderStyle = "solid";

    for(let i = 0; i < days.length; i++){
      if(selectedRecipe.days[i]) 
        days[i].style.backgroundColor = "#d1ffcf"   
    }
  })
}