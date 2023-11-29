import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer( {toysData, onDeleteToy, addLikeToy} ) {
  return (
    <div id="toy-collection">
      {toysData.map((toy) => <ToyCard key={toy.id} toy={toy} onDeleteToy={onDeleteToy} addLikeToy={addLikeToy}/>)}
      {/* Render the collection of ToyCards */}
      </div>
  );
}

export default ToyContainer;
