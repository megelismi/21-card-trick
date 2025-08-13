import { useMachine } from "@xstate/react";
import cardTrickMachine from "./machines/cardTrickMachine";
import CardTable from "./components/CardTable";
import DebugControls from "./components/DebugControls";
import DialogueBox from "./components/DialogueBox";
import StackSelectors from "./components/StackSelectors";
import type { SelectedStack } from "./types/cardTrickMachine";

function App() {
  const [state, send] = useMachine(cardTrickMachine);

  const phase = state.value;
  const cards = state.context.cards;

  const handleStackSelected = (selectedStack: SelectedStack) => {
    console.log("should be sending selectedStack", selectedStack);
    send({ type: "SELECT_STACK", selectedStack });
  };

  return (
    <div className="flex flex-wrap justify-center  bg-green-700 p-2 h-screen">
      <DebugControls send={send} />
      <CardTable phase={phase} cards={cards} />
      <StackSelectors phase={phase} onStackSelected={handleStackSelected} />
      <DialogueBox phase={phase} />
    </div>
  );
}

export default App;
