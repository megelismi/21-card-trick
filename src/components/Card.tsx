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

export default function Card({ suit, rank }: { suit: Suit; rank: Rank }) {
  return (
    <div className="flex flex-col items-center justify-between p-3 m-3 bg-white max-sm:w-[150px] max-sm:h-[200px] w-[200px] h-[275px] border border-gray-200 rounded-sm shadow-sm">
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
      } flex w-full justify-between max-sm:text-[48px] text-[60px] font-bold leading-none`}
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
    <div
      className={
        `leading-none ${
          suit === "hearts" || suit === "diamonds"
            ? "text-red-500"
            : "text-gray-900"
        }` +
        " " +
        `${
          size === "large"
            ? "text-[150px] max-sm:text-[100px]"
            : "text-[60px] max-sm:text-[48px]"
        }`
      }
    >
      {icons[suit]}
    </div>
  );
}
