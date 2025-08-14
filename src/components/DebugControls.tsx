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
    </div>
  );
}

export default DebugControls;
