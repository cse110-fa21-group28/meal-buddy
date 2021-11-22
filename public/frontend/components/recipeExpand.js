// RecipeExpand.js

class RecipeExpand extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create styles and root element
      const styles = document.createElement('style');
      const article = document.createElement('article');
  
      // Fill in styles and root element
      styles.innerHTML = `
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
      `;
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
            <h2>INSTRUCTIONS</h2>
            <ol></ol>
          </section>
        </main>
      `;
  
      // Append elements to the shadow root
      this.shadowRoot.append(styles, article);
    }
  
    /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     */
    set data(data) {
      this.json = data;
  
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
      `;
  
      // Set Title
      const title = getTitle(data).toUpperCase();
      this.shadowRoot.querySelector('header > h1').innerHTML = title;
  
      // Set the Servings yield
      // const servingsYield = getYield(data);
      // this.shadowRoot.querySelector('.meta--yield').innerHTML = servingsYield;
  
      // Set the total time
      // const totalTime = convertTime(searchForKey(data, 'totalTime'));
      // this.shadowRoot.querySelector('.meta--total-time').innerHTML = totalTime;

      // Set Calories
      const calories = getCalories(data);
      this.shadowRoot.querySelector('.meta--calories').innerHTML = calories;
  
      // Set Categories
      // const categories = getCategories(data);
      // this.shadowRoot.querySelector('.meta--categories').innerHTML = categories;
  
      // Set Description
      const description = getDescription(data);
      this.shadowRoot.querySelector('p.description').innerHTML = description;
  
      // Set Image
      const imgSrc = getImage(data);
      const img = this.shadowRoot.querySelector('img.thumbnail');
      img.setAttribute('src', imgSrc);
      img.setAttribute('alt', title);
  
      // Set Ingredients
      const ingredients = getIngredients(data);
      ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.innerHTML = ingredient;
        this.shadowRoot.querySelector('.section--ingredients > ul').append(listItem);
      });
  
      // Set Instructions
      const instructions = getInstructions(data);
      instructions.forEach(instruction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = instruction;
        this.shadowRoot.querySelector('.section--instructions > ol').append(listItem);
      });

      // Set Ratings
      // const ratingVal = searchForKey(data, 'ratingValue');
      // let ratingTotal = searchForKey(data, 'ratingCount');
      // const rating = this.shadowRoot.querySelector('.rating--wrapper');
      // const numStars = Math.round(ratingVal);
      // if (ratingVal) {
      //   rating.innerHTML = `
      //   <img src="assets/images/icons/${numStars}-star.svg" alt="${numStars} stars">
      //   <span>${ratingVal}</span>
      //   from
      //   `;
      //   if (!ratingTotal) {
      //     ratingTotal = 'some';
      //   }
      //   rating.innerHTML += `<span class="rating-total">${ratingTotal} votes</span>`;
      // } else {
      //   rating.innerHTML = `
      //     <span>No Reviews</span>
      //   `;
      // }
    }
  
    /**
     * Returns the object of the currect recipe being used.
     */
    get data() {
      return this.json;
    }
  }
  
  /**
   * Recursively search for a key nested somewhere inside an object
   * @param {Object} object the object with which you'd like to search
   * @param {String} key the key that you are looking for in the object
   * @returns {*} the value of the found key
   */
  function searchForKey(object, key) {
    var value;
    for (k in object) {
      if (k === key) {
        value = object[k];
        break;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = searchForKey(object[k], key);
      }
    }
    return value;

    // var value;
    // Object.keys(object).some(function (k) {
    //   if (k === key) {
    //     value = object[k];
    //     return true;
    //   }
    //   if (object[k] && typeof object[k] === 'object') {
    //     value = searchForKey(object[k], key);
    //     return value !== undefined;
    //   }
    // });
    // return value;
  }

  /**
   * Extract the calories of the recipe from the given recipe JSON object
   * @param {Object} data Raw recipe JSON to find the calories of
   * @returns {Number} If found, returns the calories of the recipe
   */
  function getCalories(data) {
    if(data.calories) return data.calories;

    return null;
  }

  /**
   * Extract the description of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe description
   */
   function getDescription(data) {
    if (data.description) return data.description;
    
    return null;
  }

  /**
   * Extract a usable image from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the URL of the image as a string, otherwise null
   */
   function getImage(data) {
    if (data.image_url) return data.image_url;
    
    return null;
  }

  /**
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe title
   */
   function getTitle(data) {
    if (data.name) return data.name;
    
    return null;
  }

  /**
   * Extract the instructions of the recipe from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the instructions of
   * @returns {Array} If found, returns the recipe instructions
   */
  function getInstructions(data) {
    if(data.instructions) return data.instructions;

    return null
  }
  
  /**
   * Extract the categories of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe categories
   */
  function getCategories(data) {
    // if(data.category) return data.category;
    var categories = "";
    if (data.category) {
      data.category.forEach((c, i) => {
        categories += c;
        if(i < data.category.length - 1) {
          categories += ", "
        }
      });
    }
    
    return categories;
  }  

  /**
   * Extract the ingredients of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe ingredients
   */
   function getIngredients(data) {
    if(data.recipe_ingredient) return data.recipe_ingredient;
    
    return null;
  }
  
  /**
   * Extract the URL from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the URL of
   * @returns {String} If found, it returns the URL as a string, otherwise null
   */
  /*
  function getUrl(data) {
    if (data.url) return data.url;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') return data['@graph'][i]['@id'];
      }
    };
    return null;
  }
  */
  
  /**
   * Similar to getUrl(), this function extracts the organizations name from the
   * schema JSON object. It's not in a standard location so this function helps.
   * @param {Object} data Raw recipe JSON to find the org string of
   * @returns {String} If found, it retuns the name of the org as a string, otherwise null
   */
  /* 
  function getOrganization(data) {
    if (data.publisher?.name) return data.publisher?.name;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'WebSite') {
          return data['@graph'][i].name;
        }
      }
    };
    return null;
  }
  */
  
  /**
   * Extract the instructions of the recipe from the given recipe schema JSON obejct.
   * This ones a bit messy and optimally should be refactored but it works.
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe instructions
   */
  /*
  function getInstructions(data) {
    if (data.recipeInstructions) {
      if (typeof data.recipeInstructions == 'string') {
        return data.recipeInstructions.split('. ');
      }
      return data.recipeInstructions;
    };
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['recipeInstructions'] == 'string') {
            return data['@graph'][i]['recipeInstructions'].split('. ');
          }
          if (data['@graph'][i]['recipeInstructions'][0]['itemListElement']) {
            const instructionArr = [];
            data['@graph'][i]['recipeInstructions'].forEach(instrObj => {
              instrObj.itemListElement.forEach(instruction => {
                instructionArr.push(instruction.text);
              });
            });
            return instructionArr;
          } else {
            return data['@graph'][i]['recipeInstructions'].map(instr => instr.text);
          }
        };
      }
    }
    return null;
  }
  */

  /**
   * Extract the yield of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe yield
   */
  /*
  function getYield(data) {
    if (data.recipeYield) return data.recipeYield;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['recipeYield']) {
            if (Array.isArray(data['@graph'][i]['recipeYield'])) {
              return data['@graph'][i]['recipeYield'][0];
            } else if (typeof data['@graph'][i]['recipeYield'] == 'string') {
              return data['@graph'][i]['recipeYield'];
            }
          }
        }
      }
    }
    return null;
  }
  */

  /**
   * Converts ISO 8061 time strings to regular english time strings.
   * Not perfect but it works for this lab
   * @param {String} time time string to format
   * @return {String} formatted time string
   */
  /*
  function convertTime(time) {
    let timeStr = '';
  
    // Remove the 'PT'
    time = time.slice(2);
  
    let timeArr = time.split('');
    if (time.includes('H')) {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'H') return `${timeStr} hr`;
        timeStr += timeArr[i];
      }
    } else {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'M') return `${timeStr} min`;
        timeStr += timeArr[i];
      }
    }
  
    return '';
  }
  */
  
  customElements.define('recipe-expand', RecipeExpand);