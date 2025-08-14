import StackButton from "./StackButton";
import type { SelectedStack } from "../types/cardTrickMachine";
import type { CardTrickEvents } from "../types/cardTrickMachine";

function StackSelectors({
  phase,
  send,
}: {
  phase: string;
  send: (arg0: CardTrickEvents) => void;
}) {
  if (phase !== "ask") {
    return null;
  }

  const handleStackSelected = (selectedStack: SelectedStack): void => {
    send({ type: "SELECT_STACK", selectedStack });
  };

  return (
    <div className="fixed bottom-[150px] grid grid-cols-3 gap-6 mt-4 max-w-[727px] w-full">
      <div className="flex justify-start">
        <StackButton
          stackNumber={1}
          onClickCallback={() => handleStackSelected(0)}
        />
      </div>
      <div className="flex justify-center">
        <StackButton
          stackNumber={2}
          onClickCallback={() => handleStackSelected(1)}
        />
      </div>
      <div className="flex justify-end">
        <StackButton
          stackNumber={3}
          onClickCallback={() => handleStackSelected(2)}
        />
      </div>
    </div>
  );
}

export default StackSelectors;
