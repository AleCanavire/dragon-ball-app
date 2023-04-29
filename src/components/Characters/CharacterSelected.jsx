import React, { useState, useEffect } from 'react'

function CharacterSelected({ selected }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(()=>{
    setImageLoaded(false);
  }, [selected.image]);

  useEffect(()=>{
    setImageLoaded(true);
  }, [])
  return (
    <div className="character-selected character-selected-1p">
      <img
        style={imageLoaded ? {display: "block"} : {display: "none"}}
        src={selected.image}
        alt={selected.name}
        className="selected"
        onLoad={handleImageLoad}
      />
      <div className="bar-name bar-name-1p">
        <img src="/images/bar-name-1p.png" />
        <p className="name">{selected.name}</p>
        {selected.subtitle && <p className="subtitle">{selected.subtitle}</p>}
      </div>
    </div>
  )
}

export default CharacterSelected