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
    <div className="stage grid grid-rows-[1fr_auto] p-4">
      <section className="row-[1]">
        <div
          className=" mx-auto
          max-w-[min(960px,92vw)] 
          min-h-[clamp(360px,60vh,680px)]  
          flex items-start justify-center "
        >
          <CardTable
            phase={phase}
            cards={cards}
            round={round}
            send={send}
            selectedStack={selectedStack}
          />
        </div>
      </section>
      <footer
        className={`
          row-[2] 
          ${phase === "reveal" || phase === "done" ? "mt-[-24px]" : ""}
        `}
      >
        <div
          className="
            mx-auto 
            min-h-[var(--dialogue-box-with-btn-h)]  
            max-w-[min(960px,92vw)] 
            flex items-end justify-center
          "
        >
          <DialogueBox
            dialogue={dialogue}
            visible={!!dialogue}
            phase={phase}
            send={send}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
