import "./App.css";

// import { CardProvider } from "./context/CardContext";

// import CardTrick from "./CardTrick";

function App() {
  return (
    <>
      <Card suit="spades" rank="Q" />
      <Card suit="hearts" rank="Q" />
    </>
  );
}

type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

function Card({ suit, rank }: { suit: Suit; rank: Rank }) {
  return (
    <div className="flex flex-col items-center justify-between p-3 sm:w-[150px] bg-white sm:h-[200px] md:w-[200px] md:h-[275px] border border-gray-200 rounded-sm shadow-sm">
      <Rank rank={rank} suit={suit} />
      <SuitIcon suit={suit} size="large" />
    </div>
  );
}

function Rank({ rank, suit }: { rank: Rank; suit: Suit }) {
  return (
    <div
      className={`${
        suit === "hearts" || suit === "diamonds"
          ? "text-red-500"
          : "text-gray-900"
      } flex w-full justify-evenly sm:text-3xl md:text-5xl font-bold`}
    >
      {rank}
      <SuitIcon suit={suit} size="small" />
    </div>
  );
}

function SuitIcon({ suit, size }: { suit: Suit; size: "large" | "small" }) {
  const icons: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  return (
    <span
      className={
        `${
          suit === "hearts" || suit === "diamonds"
            ? "text-red-500"
            : "text-gray-900"
        }` +
        " " +
        `${
          size === "large"
            ? "md:text-[150px] sm:text-[100px]"
            : "md:text-[48px] sm:text-[36px]"
        }`
      }
    >
      {icons[suit]}
    </span>
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
