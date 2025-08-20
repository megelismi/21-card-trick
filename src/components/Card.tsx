import type { Suit, Rank } from "../types/cards";

export default function Card({ suit, rank }: { suit: Suit; rank: Rank }) {
  return (
    <div
      className={`crimson-text-semibold flex flex-col 
        items-center justify-between p-3 bg-white 
        w-[var(--card-w)] h-[var(--card-h)] border border-gray-300 
        rounded-sm shadow-md`}
    >
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
      } flex w-full justify-between max-md:text-[36px] text-[48px] font-bold leading-none`}
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
        `leading-none mt-[5px] ${
          suit === "hearts" || suit === "diamonds"
            ? "text-red-500"
            : "text-gray-900"
        }` +
        " " +
        `${
          size === "large"
            ? "text-[125px] max-md:text-[75px] max-sm:text-[68px]"
            : "text-[48px] max-md:text-[36x] max-sm:text-[32px]"
        }`
      }
    >
      {icons[suit]}
    </div>
  );
}
