import type { Events } from "../types/cardTrickMachine";

function DebugControls({ send }: { send: (arg0: Events) => void }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => send({ type: "INTRO" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Intro
      </button>
      <button
        onClick={() => send({ type: "DEAL_ROUND_1" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 1
      </button>
      <button
        onClick={() => send({ type: "GATHER_ROUND", selectedColumn: 2 })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Gather Cards
      </button>
      <button
        onClick={() => send({ type: "DEAL_ROUND_2" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 2
      </button>
      <button
        onClick={() => send({ type: "DEAL_ROUND_3" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Deal Cards 3
      </button>
      <button
        onClick={() => send({ type: "REVEAL" })}
        className="bg-blue-500 px-2 py-1 text-white"
      >
        Reveal
      </button>
    </div>
  );
}

export default DebugControls;
