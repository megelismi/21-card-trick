import type { CardTrickEvents } from "../types/cardTrickMachine";

function DebugControls({ send }: { send: (arg0: CardTrickEvents) => void }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => send({ type: "INTRO" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Intro
      </button>
      <button
        onClick={() => send({ type: "DEAL_CARDS_1" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 1
      </button>
      <button
        onClick={() => send({ type: "ASK_COLUMN_1" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Ask Column 1
      </button>
      <button
        onClick={() => send({ type: "GATHER_CARDS_1", selectedColumn: 2 })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Gather Cards 1
      </button>
      <button
        onClick={() => send({ type: "DEAL_CARDS_2" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 2
      </button>
      <button
        onClick={() => send({ type: "ASK_COLUMN_2" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Ask Column 2
      </button>
      <button
        onClick={() => send({ type: "GATHER_CARDS_2", selectedColumn: 2 })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Gather Cards 2
      </button>
      <button
        onClick={() => send({ type: "DEAL_CARDS_3" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 3
      </button>
      <button
        onClick={() => send({ type: "ASK_COLUMN_3" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Ask Column 3
      </button>
      <button
        onClick={() => send({ type: "GATHER_CARDS_3", selectedColumn: 2 })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Gather Cards 3
      </button>
      <button
        onClick={() => send({ type: "REVEAL" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Reveal
      </button>
      <button
        onClick={() => send({ type: "DONE" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Done
      </button>
    </div>
  );
}

export default DebugControls;
