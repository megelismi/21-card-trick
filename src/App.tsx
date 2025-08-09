import "./App.css";
import { useMachine } from "@xstate/react";
import cardTrickMachine from "./machines/cardTrickMachine";
import CardTable from "./components/CardTable";
import DialogueBox from "./components/DialogueBox";

function App() {
  const [state, send] = useMachine(cardTrickMachine);

  // helper to map the machine value to subtitle key (string)
  const phase = String(state.value);

  const handleNext = () => send({ type: "NEXT" });
  const handlePrev = () => send({ type: "PREV" });

  const handleCardClick = (colIndex: number) => {
    // clicking when asked selects column
    if (
      phase === "askColumn1" ||
      phase === "askColumn2" ||
      phase === "askColumn3"
    ) {
      send({ type: "SELECT_COLUMN", columnIndex: colIndex });
    }
  };

  return (
    <div className="flex flex-wrap justify-center h-screen bg-gray-100">
      <CardTable phase={phase} onCardClick={handleCardClick} />
      <DialogueBox stateName={phase} onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
}

export default App;
