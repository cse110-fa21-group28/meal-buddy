const { getTitle } = require('../public/src/recipes/private/functions.js')
const { getImage } = require('../public/src/recipes/private/functions.js')
const { searchForKey } = require('../public/src/recipes/private/functions.js')
const { createIngredientList } = require('../public/src/recipes/private/functions.js')

const { getIngredients } = require('../public/src/recipes/private/functions.js')
const { getInstructions } = require('../public/src/recipes/private/functions.js')
const { getCalories } = require('../public/src/recipes/private/functions.js')
const { getDescription } = require('../public/src/recipes/private/functions.js')
const { getUrl } = require('../public/src/recipes/private/functions.js')

// __________________________ getTitle 1 __________________________
test('Testing getTitle(data) function 1', () => {
  expect(getTitle({ name: 'hello' })).toBe('hello')
})

// __________________________ getTitle 2 __________________________
test('Testing getTitle(data) function 2', () => {
  expect(getTitle({ school: 'ucsd', name: 'hello' })).toBe('hello')
})

// __________________________ getTitle 3 __________________________
test('Testing getTitle(data) function 3', () => {
  expect(getTitle({ school: 'ucsd' })).toBe(null)
})

// __________________________ getImage 1 __________________________
test('Testing getImage(data) function 1', () => {
  expect(getImage({ image_url: 'theUrl' })).toBe('theUrl')
})

// __________________________ getImage 2 __________________________
test('Testing getImage(data) function 2', () => {
  expect(getImage({ name: 'title', image_url: 'theUrl' })).toBe('theUrl')
})

// __________________________ getImage 3 __________________________
test('Testing getImage(data) function 3', () => {
  expect(getImage({ name: 'title' })).toBe(null)
})

// ________________________ searchForKey 1 _________________________
test('Testing searchForKey(data) function 1', () => {
  expect(searchForKey({ firstName: 'farnia', lastName: 'nafarifard', school: 'ucsd' }, 'lastName')).toBe('nafarifard')
})

// ________________________ searchForKey 2 _________________________
test('Testing searchForKey(data) function 2', () => {
  expect(searchForKey({ school: 'ucsd' }, 'name')).toBe(undefined)
})

// ________________________ createIngredientList 1 _________________________
test('Testing createIngredientList(ingArr) function 1', () => {
  expect(createIngredientList(['1 slice chicken', '1 slice onion', '1 cup water'])).toBe('chicken, onion, water')
})

// ________________________ createIngredientList 2 _________________________
test('Testing createIngredientList(ingArr) function 2', () => {
  expect(createIngredientList(['1 slice', '1 slice', 'water'])).toBe(', , ')
})

// __________________________ getIngredients 1 __________________________
test('Testing getIngredients(data) function 1', () => {
  expect(getIngredients({ recipe_ingredient: 'avacado, apples, soda' })).toBe('avacado, apples, soda')
})

// __________________________ getIngredients 2 __________________________
test('Testing getIngredients(data) function 2', () => {
  expect(getIngredients({ names: 'thuc, fione, darren' })).toBe(null)
})

// __________________________ getInstructions 1 __________________________
test('Testing getInstructions(data) function 1', () => {
  expect(getInstructions({ name: 'tart', instructions: 'stir, mix, put in the fridge' })).toBe('stir, mix, put in the fridge')
})

// __________________________ getInstructions 2 __________________________
test('Testing getInstructions(data) function 2', () => {
  expect(getInstructions({ schools: 'usc, ucsd, ucla' })).toBe(null)
})

// __________________________ getCalories 1 __________________________
test('Testing getCalories(data) function 1', () => {
  expect(getCalories({ name: 'pizza', calories: '5000' })).toBe('5000')
})

// __________________________ getCalories 2 __________________________
test('Testing getCalories(data) function 2', () => {
  expect(getCalories({ name: 'kebab' })).toBe(null)
})

// __________________________ getDescription 1 __________________________
test('Testing getDescription(data) function 1', () => {
  expect(getDescription({ name: 'pizza', description: 'very delicious italian pizza!' })).toBe('very delicious italian pizza!')
})

// __________________________ getDescription 2 __________________________
test('Testing getDescription(data) function 2', () => {
  expect(getDescription({ name: 'kebab', calories: '450' })).toBe(null)
})

// __________________________ getUrl 1 __________________________
test('Testing getUrl(data) function 1', () => {
  expect(getUrl({ name: 'pasta', recipe_url: 'https://www.101cookbooks.com/homemade-pasta/' })).toBe('https://www.101cookbooks.com/homemade-pasta/')
})

// __________________________ getUrl 2 __________________________
test('Testing getUrl(data) function 2', () => {
  expect(getUrl({ name: 'macaroni', calories: '450' })).toBe(null)
})
