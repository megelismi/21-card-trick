import "../Animations.css";
import "../Cards.css";

export default function CardRow({ children }: { children: React.ReactNode }) {
  return <div className="card-row">{children}</div>;
}
