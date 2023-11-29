import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const toyAPI ='http://localhost:3001/toys'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [ toys, setToys ] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch(toyAPI)
    .then(res => res.json())
    .then(setToys)
  },[])

  function handleAddToy(newToy) {
    setToys([...toys, newToy])
  }

  function handleDeleteToy(toyId) {
    setToys(toys.filter((toy) => toy.id !== toyId))
  }

  function handleAddLikes(toyId) {
    //find the toy with the specified Id for this we use a .map using an if statement
    const updateToys = toys.map((toy) => {
      if ( toy.id === toyId ) {
        //increment the likes for the specific toy
        return {...toy, likes: toy.likes + 1}
      }
      return toy
    })
      setToys(updateToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm  addOnToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toysData={toys} onDeleteToy={handleDeleteToy} addLikeToy={handleAddLikes}/>
    </>
  );
}

export default App;
