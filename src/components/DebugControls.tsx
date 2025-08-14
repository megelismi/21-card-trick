import type { CardTrickEvents } from "../types/cardTrickMachine";

function DebugControls({ send }: { send: (arg0: CardTrickEvents) => void }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => send({ type: "DEAL" })}
        className="bg-blue-500 p-3 rounded-sm uppercase text-white"
      >
        Deal
      </button>
      <button
        onClick={() => send({ type: "REVEAL" })}
        className="bg-blue-500 p-3 rounded-sm uppercase text-white"
      >
        Reveal
      </button>
      <button
        onClick={() => send({ type: "TRICK_DONE" })}
        className="bg-blue-500 p-3 rounded-sm uppercase text-white"
      >
        Trick Done
      </button>
      <button
        onClick={() => send({ type: "RESET" })}
        className="bg-blue-500 p-3 rounded-sm uppercase text-white"
      >
        Reset
      </button>
    </div>
  );
}

export default DebugControls;
