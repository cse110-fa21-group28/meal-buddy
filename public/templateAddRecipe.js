import {addPrivateRecipe} from './backend/private_recipe.js';
window.addEventListener('DOMContentLoaded', init);

var title, img, calorie, descr, ings, instrucs; // maybe add cook time
var obj = {};

function init(){
    let titleInput = document.getElementById('titleInput');
    let imgUrlInput = document.getElementById('imgUrlInput');
    let calorieInput = document.getElementById('calorieInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let ingredientsInput = document.getElementById('ingredientsInput');
    let instructionsInput = document.getElementById('instructionsInput');
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
        addPrivateRecipe(obj);
        window.location.href = "my-recipes.html";
    });
}