import type { Suit, Rank } from "../../types/cards";

export default function Card({ suit, rank }: { suit: Suit; rank: Rank }) {
  return (
    <div
      className={`no-text-select crimson-text-semibold flex flex-col 
        items-center justify-between card-padding bg-white 
        card-width card-height border border-gray-300 
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
      } no-text-select flex w-full justify-between rank-size font-bold leading-none`}
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
        `no-text-select leading-none mt-[4px] ${
          suit === "hearts" || suit === "diamonds"
            ? "text-red-500"
            : "text-gray-900"
        }` +
        " " +
        `${size === "large" ? "suit-size-large" : "suit-size-small"}`
      }
    >
      {icons[suit]}
    </div>
  );
}
