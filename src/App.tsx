import "./App.css";
import { useMachine } from "@xstate/react";
import cardTrickMachine from "./machines/cardTrickMachine";
import CardTable from "./components/CardTable";
import DialogueBox from "./components/DialogueBox";

function App() {
  const [state, send] = useMachine(cardTrickMachine);

  // helper to map the machine value to subtitle key (string)
  const phase = String(state.value);
  const cards = state.context.cards;

  console.log("CARDS IN APP.TSX", cards);

  const handleNext = () => send({ type: "NEXT" });
  const handlePrev = () => send({ type: "PREV" });

  return (
    <div className="flex flex-wrap justify-center h-screen bg-gray-100">
      <CardTable phase={phase} cards={cards} />
      <DialogueBox phase={phase} onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
}

export default App;

{
  /* <CardTable phase={phase} onCardClick={handleCardClick} /> */
}
