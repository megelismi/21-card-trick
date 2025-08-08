import ButtonRow from "./components/ButtonRow";
import Card from "./components/Card";
import CardRow from "./components/CardRow";
import { CARDS } from "./constants/cards";

function CardTrick() {
  const cards = Object.keys(CARDS);
  const firstRow = cards.slice(0, 3);
  const secondRow = cards.slice(3, 6);
  const thirdRow = cards.slice(6, 9);
  const fourthRow = cards.slice(9, 12);
  const fifthRow = cards.slice(12, 15);
  const sixthRow = cards.slice(15, 18);
  const seventhRow = cards.slice(18, 21);

  return (
    <div className="card-trick">
      <div className="cards-container">
        <CardRow>
          {firstRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={1}>
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
          {secondRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={2}>
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
          {thirdRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={3}>
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
          {fourthRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={4}>
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
          {fifthRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={5}>
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
          {sixthRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={6}>
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
          {seventhRow.map((key, index) => {
            const src = CARDS[key];

            return (
              <Card key={key} stack={index + 1} positionInStack={7}>
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
  );
}

export default CardTrick;
