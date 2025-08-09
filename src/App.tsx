import "./App.css";

// import { CardProvider } from "./context/CardContext";
// import CardTrick from "./CardTrick";
import DialogueBox from "./components/DialogueBox";

function App() {
  return (
    <div className="flex flex-wrap justify-center h-screen bg-gray-100">
      <DialogueBox />
    </div>
  );
}

export default App;

{
  /* <CardProvider>
      <div className="app-container">
        <div className="app">
        <CardTrick />
         </div>
      </div>
    </CardProvider> */
}
