export default function ButtonRow() {
  return (
    <div className="fixed bottom-[175px] grid grid-cols-3 gap-4 mt-4 max-w-[727px]">
      <button onClick={() => console.log("1st stack")}>1st Stack</button>
      <button onClick={() => console.log("2nd stack")}>2nd Stack</button>
      <button onClick={() => console.log("3rd stack")}>3rd Stack</button>
    </div>
  );
}
