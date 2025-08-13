import StackButton from "./StackButton";
import type { SelectedStack } from "../types/cardTrickMachine";

function StackSelectors({
  phase,
  onStackSelected,
}: {
  phase: string;
  onStackSelected: (arg0: SelectedStack) => void;
}) {
  if (!phase.startsWith("askColumn")) {
    return null;
  }

  return (
    <div className="fixed bottom-[150px] grid grid-cols-3 gap-6 mt-4 max-w-[727px] w-full">
      <div className="flex justify-start">
        <StackButton
          stackNumber={1}
          onClickCallback={() => onStackSelected(0)}
        />
      </div>
      <div className="flex justify-center">
        <StackButton
          stackNumber={2}
          onClickCallback={() => onStackSelected(1)}
        />
      </div>
      <div className="flex justify-end">
        <StackButton
          stackNumber={3}
          onClickCallback={() => onStackSelected(2)}
        />
      </div>
    </div>
  );
}

export default StackSelectors;
