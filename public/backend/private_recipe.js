function private_recipe (UID, name, recipe_ingredient, calories, description, instructions, image_url) {
    this.UID = UID
    this.name = name
    this.recipe_ingredient = recipe_ingredient
    this.description = description
    this.calories = calories
    this.instructions = instructions
    this.image_url = image_url
}

async function getPrivatasdfeRecipes () {
  const user = firebase.auth().currentUser;
  try {
    let data = []
    
    db.collection('private_recipe').where('UID', '==', user.uid.toString())
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let temp = doc.data()
        temp["id"] = doc.id
        data.push(temp)
        return temp;
      })
    })
    .catch((error) => {
      return "Recipe not found!"
    });

    return data;
  } catch(error) {
    return error;
  }
}


async function getPrivateRecipe(id) {
  const auth = firebase.auth()
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw "Error";
    } else {
      const docRef = db.collection('private_recipe').doc(id.toString())
      docRef.get().then((doc) => {
        if (!doc.exists) {
          console.log('No such document!')
        } else {
          console.log('Document data:', doc.data())
          return doc.data()
        }
      });
    }
  });
}

// const test_recipe = new private_recipe('wPZjlYHOCFeKUGiFSnujkAxXqSs2', 'chicken', ['pot', 'chickent'], 99999, ['chicken'], 'it is a chicken', 'www.google.com')

async function addPrivateRecipe (recipe) {
  console.log("inside add private recipe");
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw "Error";
    } else {
      console.log("user" + user.uid);
      const db = firebase.firestore()
      // Create with random ID
      const res = db.collection(user.uid).add(Object.assign({}, recipe))
    }
  })  
}

async function updatePrivateRecipe (id, new_recipe) {
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw "Error";
    } else {
      console.log("user" + user.uid);
      const db = firebase.firestore()
      // Create with random ID
      const res = db.collection(user.uid).doc(id.toString()).update(new_recipe);
    }
  }) 
}

async function deletePrivateRecipe (id) {
  console.log("inside delete private recipe");
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (!user) {
      throw "Error";
    } else {
      console.log("user" + user.uid);
      const db = firebase.firestore()
      // Create with random ID
      const res = db.collection(user.uid).doc(id.toString()).delete();
    }
  })  
}

export { addPrivateRecipe, deletePrivateRecipe, updatePrivateRecipe };