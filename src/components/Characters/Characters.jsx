import React, { useEffect, useRef, useState } from 'react';
import characters from '../../data/characters';

function Characters() {
  const [sectionActive, setSectionActive] = useState(0);
  const charactersRef = useRef();
  const [selected, setSelected] = useState(characters[0]);

  useEffect(()=>{
    function findCharacter(operation, number) {
      if (operation === "next") {
        const newSelect = characters.find(character => Number(character.id) === Number(selected.id) + number);
        if (number === 1 && Number(selected.id) % 7 !== 0) {
          console.log(newSelect.id);
          setSelected(newSelect);
        } else if (number === 7) {
          console.log(newSelect.id);
          setSelected(newSelect);
        }
      } else if (operation === "prev") {
        const newSelect = characters.find(character => Number(character.id) === Number(selected.id) - number);
        if (Number(selected.index) !== 0) {
          setSelected(newSelect);
        }
      }
    }
    function changeSelect(e) {
      if (e.key === "w" || e.key === "ArrowUp") {
        sectionActive !== 0 && setSectionActive(prevState => prevState - 1);
        sectionActive !== 0 && findCharacter("prev", 7);
      } else if (e.key === "s" || e.key === "ArrowDown") {
        sectionActive !== 13 && setSectionActive(prevState => prevState + 1);
        findCharacter("next", 7);
      } else if (e.key === "a" || e.key === "ArrowLeft") {
        findCharacter("prev", 1);
      } else if (e.key === "d" || e.key === "ArrowRight") {
        findCharacter("next", 1);
      }
    }
    document.addEventListener("keydown", changeSelect)
    return () => document.removeEventListener("keydown", changeSelect)
  }, [selected])

  useEffect(()=>{
    const translate = 100 / 14;
    charactersRef.current.style.transform = `translateY(-${translate * sectionActive}%)`;
  }, [sectionActive])

  return (
    <div className="characters-container">
      <div className="background">
        <img src="/images/select-background.jpg" />
      </div>
      <div className="character-selected-1p">
        <img src={selected.image} alt={selected.name} className="selected" />
      </div>
      <div className="character-selected-2p">

      </div>
      <div className="divider"/>
      <div className="hud-1p">
        <img src="/images/1P-HUD-BG.png" className="hud-bg" />
        <div className="hud-rays" />
        <div ref={charactersRef} className="characters">
          { characters.map(character => {
            return(
              <div key={character.id} className="character">
                <img src={character.icon} alt={character.name} />
              </div>
            )})
          }
        </div>
        <img src="/images/1P-HUD.png" className="hud" />
      </div>
      <div className="hud-2p">
        <img src="/images/2P-HUD-BG.png" className="hud-bg" />
        <div className="hud-rays" />
        <img src="/images/2P-HUD.png" className="hud" />
      </div>
    </div>
  )
}

export default Characters