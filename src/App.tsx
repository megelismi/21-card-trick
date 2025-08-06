import "./App.css";
import tenOfSpades from "./assets/svg_playing_cards/fronts/spades_10.svg";
import twoOfClubs from "./assets/svg_playing_cards/fronts/clubs_2.svg";
import threeOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_3.svg";
import fourOfHearts from "./assets/svg_playing_cards/fronts/hearts_4.svg";
import fiveOfSpades from "./assets/svg_playing_cards/fronts/spades_5.svg";
import sixOfClubs from "./assets/svg_playing_cards/fronts/clubs_6.svg";
import sevenOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_7.svg";
import eightOfHearts from "./assets/svg_playing_cards/fronts/hearts_8.svg";
import nineOfSpades from "./assets/svg_playing_cards/fronts/spades_9.svg";
import jackOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_jack.svg";
import queenOfHearts from "./assets/svg_playing_cards/fronts/hearts_queen.svg";
import kingOfSpades from "./assets/svg_playing_cards/fronts/spades_king.svg";
import aceOfClubs from "./assets/svg_playing_cards/fronts/clubs_ace.svg";
import aceOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_ace.svg";
import aceOfHearts from "./assets/svg_playing_cards/fronts/hearts_ace.svg";
import aceOfSpades from "./assets/svg_playing_cards/fronts/spades_ace.svg";
import twoOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_2.svg";
import twoOfHearts from "./assets/svg_playing_cards/fronts/hearts_2.svg";
import threeOfSpades from "./assets/svg_playing_cards/fronts/spades_3.svg";
import threeOfClubs from "./assets/svg_playing_cards/fronts/clubs_3.svg";
import fourOfDiamonds from "./assets/svg_playing_cards/fronts/diamonds_4.svg";

import ButtonRow from "./components/ButtonRow";
import Card from "./components/Card";
import CardRow from "./components/CardRow";

function App() {
  const cards = Object.keys(CARDS);
  const firstRow = cards.slice(0, 3);
  const secondRow = cards.slice(3, 6);
  const thirdRow = cards.slice(6, 9);
  const fourthRow = cards.slice(9, 12);
  const fifthRow = cards.slice(12, 15);
  const sixthRow = cards.slice(15, 18);
  const seventhRow = cards.slice(18, 21);

  return (
    <div className="app-container">
      <div className="app">
        <div className="cards-container">
          <CardRow>
            {firstRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {secondRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {thirdRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {fourthRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {fifthRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {sixthRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
          <CardRow>
            {seventhRow.map((key) => {
              const src = CARDS[key];

              return (
                <Card>
                  <img
                    src={src}
                    className="card-img"
                    alt={key.replace(/_/g, " ")}
                  />
                </Card>
              );
            })}
          </CardRow>
        </div>
        <ButtonRow />
      </div>
    </div>
  );
}

const CARDS: { [key: string]: string } = {
  clubs_ace: aceOfClubs,
  clubs_2: twoOfClubs,
  clubs_3: threeOfClubs,
  clubs_6: sixOfClubs,

  spades_ace: aceOfSpades,
  spades_3: threeOfSpades,
  spades_5: fiveOfSpades,
  spades_9: nineOfSpades,
  spades_10: tenOfSpades,
  spades_king: kingOfSpades,

  diamonds_ace: aceOfDiamonds,
  diamonds_2: twoOfDiamonds,
  diamonds_3: threeOfDiamonds,
  diamonds_4: fourOfDiamonds,
  diamonds_7: sevenOfDiamonds,
  diamonds_jack: jackOfDiamonds,

  hearts_ace: aceOfHearts,
  hearts_2: twoOfHearts,
  hearts_4: fourOfHearts,
  hearts_8: eightOfHearts,
  hearts_queen: queenOfHearts,

  // Add more cards as needed
};

export default App;
