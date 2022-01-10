import Card from "./Card";

import { useState, useEffect } from "react";
import uniqid from "uniqid";

const colorList = [
  "#c56cf0",
  "#ffb8b8",
  "#ff3838",
  "#ff9f1a",
  "#ffd32a",
  "#3ae374",
  "#67e6dc",
  "#17c0eb",
  "#7158e2",
  "#3d3d3d",
];
const Game = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardList, setCardList] = useState([
    {
      id: uniqid(),
      icon: "fa-cat",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-crow",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-dog",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-dove",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-dragon",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-hippo",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-kiwi-bird",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-otter",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-spider",
      isSelected: false,
    },
    {
      id: uniqid(),
      icon: "fa-fish",
      isSelected: false,
    },
  ]);

  const shuffleCards = () => {
    const arrayCopy = [...cardList];

    // durstenfeld shuffle
    for (let i = arrayCopy.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    setCardList(arrayCopy);
  };

  const resetCards = () => {
    setScore(0);

    setCardList((prevCardList) => {
      return prevCardList.map((card) => {
        const cardCopy = { ...card };
        cardCopy.isSelected = false;
        return cardCopy;
      });
    }, shuffleCards());
  };

  const selectCard = (e) => {
    // console.log(e.currentTarget.getAttribute("refid"));
    const id = e.currentTarget.getAttribute("refid");

    const arrayElem = cardList.find((elem) => elem.id === id);

    if (arrayElem.isSelected) {
      resetCards();
    } else {
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }

      setScore(score + 1);
      // passing callback to setCardList will run function after state is updated
      setCardList((prevCardList) => {
        return prevCardList.map((card) => {
          if (card.id === id) {
            const cardCopy = { ...card };
            cardCopy.isSelected = !cardCopy.isSelected;
            return cardCopy;
          }
          return card;
        });
      }, shuffleCards());
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game-window">
      <div className="score-container">
        <span>High Score: {highScore}</span>
        <span>Current Score: {score}</span>
      </div>
      <div className="game-container">
        {cardList.map((card, index) => {
          return (
            <Card
              key={card.id}
              card={card}
              color={colorList[index]}
              selectCard={(e) => selectCard(e)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
