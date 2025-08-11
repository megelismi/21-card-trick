import "./App.css";
import { useMachine } from "@xstate/react";
import cardTrickMachine from "./machines/cardTrickMachine";
import CardTable from "./components/CardTable";
import DialogueBox from "./components/DialogueBox";

function App() {
  const [state, send] = useMachine(cardTrickMachine);

  const phase = String(state.value);
  const cards = state.context.cards;

  const handleNext = () => send({ type: "NEXT" });
  const handlePrev = () => send({ type: "PREV" });

  return (
    <div className="flex flex-wrap justify-center  bg-green-700 p-2 h-screen">
      <CardTable phase={phase} cards={cards} />
      <DialogueBox phase={phase} onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
}

export default App;
