import { useState, useEffect } from "react";
import { useCardContext } from "../context/CardContext";
import "../Buttons.css";
import "../App.css";

export default function ButtonRow() {
  const [isVisible, setIsVisible] = useState(false);
  const { setIsCollecting, setSelectedStack } = useCardContext();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Hide buttons after 5 seconds
  }, []);

  const handleClick = (stackNumber: number) => {
    setSelectedStack(stackNumber);
    setIsCollecting(true);
  };

  return isVisible ? (
    <div className="button-row">
      <button onClick={() => handleClick(1)}>1st Stack</button>
      <button onClick={() => handleClick(2)}>2nd Stack</button>
      <button onClick={() => handleClick(3)}>3rd Stack</button>
    </div>
  ) : null;
}
