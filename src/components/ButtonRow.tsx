import "../Button.css";
import "../App.css";

export default function ButtonRow() {
  return (
    <div className="button-row">
      <button onClick={() => console.log("first stack!")}>1st Stack</button>
      <button onClick={() => console.log("second stack!")}>2nd Stack</button>
      <button onClick={() => console.log("third stack!")}>3rd Stack</button>
    </div>
  );
}
