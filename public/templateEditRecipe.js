window.addEventListener('DOMContentLoaded', init);
import {updatePrivateRecipe} from './backend/private_recipe.js';

var title, img, calorie, descr, ings, instrucs; // maybe add cook time
var obj = {};
const data = localStorage['currentRecipeData'];
const parsedData = JSON.parse(data);
console.log(parsedData);

function init(){
    let titleInput = document.getElementById('titleInput');
    titleInput.value = parsedData.name;
    let imgUrlInput = document.getElementById('imgUrlInput');
    imgUrlInput.value = parsedData.image_url;
    let calorieInput = document.getElementById('calorieInput');
    calorieInput.value = parsedData.calories;
    let descriptionInput = document.getElementById('descriptionInput');
    descriptionInput.value = parsedData.description;
    let ingredientsInput = document.getElementById('ingredientsInput');
    ingredientsInput.value = parsedData.recipe_ingredient;
    let instructionsInput = document.getElementById('instructionsInput');
    instructionsInput.value = parsedData.instructions;
    let saveButton = document.getElementById('saveButton');

    titleInput.addEventListener('input', function(){
        title = titleInput.value;
        obj["name"] = title;
    });
    imgUrlInput.addEventListener('input', function(){
        img = imgUrlInput.value;
        obj["image_url"] = img;
    });
    calorieInput.addEventListener('input', function(){
        calorie = calorieInput.value;
        obj["calories"] = calorie;
    });
    descriptionInput.addEventListener('input', function(){
        descr = descriptionInput.value;
        obj["description"] = descr;
    });
    ingredientsInput.addEventListener('input', function(){
        ings = ingredientsInput.value.split("\n");
        obj["recipe_ingredient"] = ings;
    });
    instructionsInput.addEventListener('input', function(){
        instrucs = instructionsInput.value.split("\n");
        obj["instructions"] = instrucs;
    });

    saveButton.addEventListener('click', function(){
        console.log("The JSON Object: " + JSON.stringify(obj));
        updatePrivateRecipe(parsedData.id, obj);

        // Does this reload the page? Fetch the new data from database?
        
        //window.location.href = "my-recipes.html";
    });
}