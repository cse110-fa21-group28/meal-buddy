function private_recipe (UID, name, recipe_ingredient, calories, category, description, image_url) {
  this.UID = UID
  this.name = name
  this.recipe_ingredient = recipe_ingredient
  this.description = description
  this.calories = calories
  this.image_url = image_url
  this.category = category
}

async function get_private_recipe (id) {
  const docRef = db.collection('private_recipe').doc(id.toString())
  docRef.get().then((doc) => {
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      console.log('Document data:', doc.data())
      return doc.data()
    }
  })
}
get_private_recipe('a7uJR9yCmsYUhiN64uOA')

const test_recipe = new private_recipe('wPZjlYHOCFeKUGiFSnujkAxXqSs2', 'chicken', ['pot', 'chickent'], 99999, ['chicken'], 'it is a chicken', 'www.google.com')
// console.log(test_recipe);
add_private_recipe(test_recipe)

async function add_private_recipe (recipe) {
  const db = firebase.firestore()
  // Create with random ID
  const res = db.collection('private_recipe').add(Object.assign({}, recipe))
}

async function update_private_recipe (id, new_recipe) {
  const batch = db.batch()

  const docRef = db.collection('private_recipe').doc(id.toString())
  docRef.get().then((doc) => {
    if (!doc.exists) {
      console.log('Failed to update, no new info')
      throw 'some error'
    }
    // console.log(doc.data())

    for (const att in doc.data()) {
      // console.log(att, new_recipe[att]);
      batch.update(docRef, att, new_recipe[att])
    }
    batch.commit()
  })
}

async function delete_private_recipe (id) {
  const res = db.collection('private_recipe').doc(id.toString()).delete()
}
// delete_private_recipe(3)

// update_private_recipe('a7uJR9yCmsYUhiN64uOA',test_recipe);
