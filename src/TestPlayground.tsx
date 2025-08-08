import { motion } from "motion/react";
import { useState } from "react";

function TestPlayground() {
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(0);
  const [y3, setY3] = useState(0);

  const [x, setX] = useState(0);

  const handleClick = () => {
    setY2(-40);
    setY3(-80);

    setX(-200);
  };

  return (
    <div style={playground} className="playground">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind works!</h1>
      <motion.div
        style={blueBox}
        animate={{ x, y: y1 }}
        transition={{ y: { duration: 1 }, x: { duration: 1, delay: 2 } }}
      />

      <motion.div
        style={purpleBox}
        animate={{ x, y: y2 }}
        transition={{ y: { duration: 1 }, x: { duration: 1, delay: 2 } }}
      />

      <motion.div
        style={pinkBox}
        animate={{ x, y: y3 }}
        transition={{
          y: { delay: 0.5, duration: 1 },
          x: { duration: 1, delay: 2 },
        }}
      />

      <button onClick={handleClick}>Move up</button>
    </div>
  );
}

export default TestPlayground;

const playground = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  border: "1px solid red",
  position: "relative",
};

const blueBox = {
  width: 100,
  height: 100,
  backgroundColor: "#004cffff",
  borderRadius: 5,
  position: "absolute",
  top: "200px",
  zIndex: 1,
};

const purpleBox = {
  width: 100,
  height: 100,
  backgroundColor: "#9d00ffff",
  borderRadius: 5,
  top: "240px",
  zIndex: 2,
  position: "absolute",
};

const pinkBox = {
  width: 100,
  height: 100,
  backgroundColor: "#ff0088",
  borderRadius: 5,
  top: "280px",
  zIndex: 3,
  position: "absolute",
};
