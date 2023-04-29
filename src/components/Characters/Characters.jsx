import React, { useEffect, useRef, useState } from 'react';
import characters, { defaultArray } from '../../data/characters';
import ArrowUp from "../../assets/images/arrow-up.svg";
import ArrowDown from "../../assets/images/arrow-down.svg";

function Characters() {
  const [sectionActive, setSectionActive] = useState(0);
  const charactersRef = useRef();
  const [selected, setSelected] = useState(characters[0]);
  const [animation, setAnimation] = useState(true);
  const [transformations, setTransformations] = useState(null);
  const [transformation, setTransformation] = useState(0);
  const [showTransformations, setShowTransformations] = useState(false);

  const selectCharacter = new Audio("/media/select-character.mp3");
  const sectionUp = new Audio("/media/section-up.mp3");
  const sectionDown = new Audio("/media/section-down.mp3");
  const transformationSound = new Audio("/media/transformations.mp3");

  const soundtrack = new Audio("./media/soundtrack.mp3");
  useEffect(()=>{
    soundtrack.play();
    soundtrack.loop = true;
  }, [])
  
  useEffect(()=>{
    const translate = 100 / 14;
    charactersRef.current.style.transform = `translateY(-${translate * sectionActive}%)`;

    setAnimation(true);
    setTimeout(setAnimation, 400, false);
    function findCharacter(operation, number) {
      if (operation === "next") {
        const newSelect = characters.find(character => Number(character.id) === Number(selected.id) + number);
        if (number === 1 && Number(selected.id) % 7 !== 0) {
          if (transformations) {
            if (transformation < transformations.quantity) {
              setTransformation(transformation + 1);
              setSelected(transformations.all[transformation + 1]);
              selectCharacter.play();
            }
          } else{
            setSelected(newSelect);
            selectCharacter.play();
          }
        } else if (number === 7 && !transformations) {
          setSelected(newSelect);
          sectionDown.play();
        }
      } else if (operation === "prev") {
        const newSelect = characters.find(character => Number(character.id) === Number(selected.id) - number);
        if (number === 1 && selected.index % 7 !== 0) {
          if (transformations) {
            if (transformation > 0) {
              setTransformation(transformation - 1);
              setSelected(transformations.all[transformation - 1]);
              selectCharacter.play();
            }
          } else{
            setSelected(newSelect);
            selectCharacter.play();
          }
        } else if (number === 7  && !transformations) {
          setSelected(newSelect);
          sectionUp.play();
        }
      }
    }
    function changeSelect(e) {
      if (e.key === "w" || e.key === "ArrowUp") {
        (sectionActive !== 0 && !transformations) && setSectionActive(prevState => prevState - 1);
        sectionActive !== 0 && findCharacter("prev", 7);
      } else if (e.key === "s" || e.key === "ArrowDown") {
        (sectionActive !== 13 && !transformations) && setSectionActive(prevState => prevState + 1);
        sectionActive !== 13 && findCharacter("next", 7);
      } else if (e.key === "a" || e.key === "ArrowLeft") {
        findCharacter("prev", 1);
      } else if (e.key === "d" || e.key === "ArrowRight") {
        findCharacter("next", 1);
      } else if (e.key === "Enter" && selected.transformations) {
        const length = selected.transformations.length;
        const remove = defaultArray.slice(length, 7);
        setTransformations({
          all: [...selected.transformations, ...remove],
          quantity: length - 1
        });
        setSelected(selected.transformations[0]);
        setShowTransformations(true)
        transformationSound.play();
      } else if (e.keyCode === 27) {
        const prevSelect = characters.find(character => character.image === transformations.all[0].image)
        setTransformations(null);
        setTransformation(0);
        setSelected(prevSelect);
        setShowTransformations(false);
        transformationSound.play();
      }
    }
    document.addEventListener("keydown", changeSelect)
    return () => document.removeEventListener("keydown", changeSelect)
  }, [selected])

  return (
    <div className="characters-container">
      <div className="background">
        <img src="/images/select-background.webp" />
      </div>
      <div className="character-selected character-selected-1p">
        <img
          style={animation ? {animation: "show .4s ease-out"} : {}}
          src={selected.image} alt={selected.name} className="selected"
        />
        <div className="bar-name bar-name-1p">
          <img src="/images/bar-name-1p.png" />
          <p className="name">{selected.name}</p>
          {selected.subtitle && <p className="subtitle">{selected.subtitle}</p>}
        </div>
      </div>
      <div className="character-selected character-selected-2p">
        <img src={characters[1].image} alt={characters[1].name} className="selected"/>
        <div className="bar-name bar-name-2p">
          <img src="/images/bar-name-2p.png" />
          <p className="name">{characters[1].name}</p>
          {characters[1].subtitle && <p className="subtitle">{characters[1].subtitle}</p>}
        </div>
      </div>
      <div className="divider"/>
      <div className="hud-1p">
        <img src="/images/1P-HUD-BG.png" className="hud-bg" />
        <div className="hud-rays" />
        <img src="/images/1P-HUD.png" className="hud" />
        <div style={showTransformations ? {width: "0%"} : {width: "82.5vw"}} className="characters-slider">
          <div className="characters" ref={charactersRef}>
          { characters.map(character => {
            return(
              <div key={character.id} className="character">
                <img className={character.id === selected.id ? "active" : ""} src={character.icon} alt={character.name} />
              </div>
            )})
          }
          </div>
        </div>
        { transformations &&
          <div className="transformations-container">
            <div className="transformations">
            { transformations.all.map((character, index) => {
              return(
                <div key={character.id || index} className="character">
                  <img className={character.id === selected.id ? "active" : ""} src={character.icon} alt={character.name} />
                </div>
              )})
            }
            </div>
          </div>
        }
        <div className="arrow-up">
          <img src={ArrowUp} />
        </div>
        <div className="arrow-down">
          <img src={ArrowDown} />
        </div>
      </div>
      <div className="hud-2p">
        <img src="/images/2P-HUD-BG.png" className="hud-bg" />
        <div className="hud-rays" />
        <img src="/images/2P-HUD.png" className="hud" />
        <div className="characters-slider">
          <div className="characters">
          { characters.map(character => {
            return(
              <div key={character.id} className="character">
                <img src={character.icon} alt={character.name} />
              </div>
            )})
          }
          </div>
        </div>
      </div>
      <div className="hide-characters"/>
    </div>
  )
}

export default Characters