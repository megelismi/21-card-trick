import StackButton from "./StackButton";

function StackSelectors({ phase }: { phase: string }) {
  const handleClick = (stackNumber: number): void => {
    console.log(`stack ${stackNumber} clicked`);
  };

  if (
    phase !== "askColumn1" &&
    phase !== "askColumn2" &&
    phase !== "askColumn3"
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-[150px] grid grid-cols-3 gap-6 mt-4 max-w-[727px] w-full">
      <div className="flex justify-start">
        <StackButton stackNumber={"1"} onClickCallback={() => handleClick(1)} />
      </div>
      <div className="flex justify-center">
        <StackButton stackNumber={"2"} onClickCallback={() => handleClick(2)} />
      </div>
      <div className="flex justify-end">
        <StackButton stackNumber={"3"} onClickCallback={() => handleClick(3)} />
      </div>
    </div>
  );
}

export default StackSelectors;
