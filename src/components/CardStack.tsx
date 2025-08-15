import StackButton from "./StackButton";
import type { ReactNode } from "react";
import type { CardTrickEvents } from "../types/cardTrickMachine";
import type { SelectedStack } from "../types/cardTrickMachine";

function CardStack({
  phase,
  children,
  stackNumber,
  send,
}: {
  phase: string;
  children: ReactNode;
  stackNumber: SelectedStack;
  send: (arg0: CardTrickEvents) => void;
}) {
  const handleStackSelected = (selectedStack: SelectedStack): void => {
    send({ type: "SELECT_STACK", selectedStack });
  };

  return (
    <div className="flex flex-col justify-between items-center border border-amber-500 max-h-[740px]">
      <div
        className="scale-100 hover:scale-103
        transition-transform duration-300 relative cursor-pointer"
        onClick={() => handleStackSelected(stackNumber)}
      >
        {children}
      </div>
      <StackButton
        phase={phase}
        onClickCallback={() => handleStackSelected(stackNumber)}
        stackNumber={stackNumber}
      />
    </div>
  );
}

export default CardStack;
