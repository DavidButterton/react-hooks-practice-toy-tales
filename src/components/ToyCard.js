import React, { useState } from "react";

const toyAPI ='http://localhost:3001/toys'

function ToyCard( {toy, onDeleteToy, addLikeToy} ) {
  const [likes, setLikes ] = useState(toy.likes)

  const handleDonateClick = () => {
    // Make a DELETE request to remove the toy from the server
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Call the onDeleteToy function to update the state in the parent component
        onDeleteToy(toy.id);
      })
      .catch((error) => console.error("Error deleting toy:", error));
  };

  const handleLikeClick = () => {
    //Make a Patch request to /toys/:id with the id of the toy that was clicked, along with the new number of likes
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : 'application/json',
      },
      body: JSON.stringify({likes: likes + 1}), //increment the likes 
    }).then(res => res.json())
    .then((updatedToy) => {
      //update the likes in the state
      addLikeToy(updatedToy.id, updatedToy.likes)
    })
    .catch((error) => console.error("Error updating likes:", error))
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={(handleLikeClick)}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonateClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
