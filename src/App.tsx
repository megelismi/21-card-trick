import { useMachine } from "@xstate/react";
import cardTrickMachine from "./machines/cardTrickMachine";
import CardTable from "./components/CardTable/index";
import DialogueBox from "./components/DialogueBox";

function App() {
  const [state, send] = useMachine(cardTrickMachine);

  const phase = state.value;
  const cards = state.context.cards;
  const round = state.context.round;
  const dialogue = state.context.dialogue;
  const selectedStack = state.context.selectedStack;

  return (
    <div className="flex flex-wrap justify-center p-2 h-screen">
      <CardTable
        phase={phase}
        cards={cards}
        round={round}
        send={send}
        selectedStack={selectedStack}
      />
      <DialogueBox
        dialogue={dialogue}
        visible={!!dialogue}
        phase={phase}
        send={send}
      />
    </div>
  );
}

export default App;
