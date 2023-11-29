import React, { useState } from "react";

const toyAPI = 'http://localhost:3001/toys';

function ToyForm({ addOnToy }) {
  const [formData, setFormData] = useState({ name: '', image: '' });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Make a 'POST' request to save the new toy on the server
    fetch(toyAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newToy) => {
        addOnToy(newToy);
        setFormData({ name: '', image: '' }); // Reset the form after successful submission
      })
      .catch((error) => console.error('Error creating toy:', error));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  )
}

export default ToyForm;
