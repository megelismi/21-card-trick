import woodBackground from "../../public/images/beige-wooden-textured-flooring-background.jpg";

function StackButton({ stackNumber }: { stackNumber: "1" | "2" | "3" }) {
  return (
    <button
      className={`w-28 h-12
        magician-font
        cursor-pointer
        scale-100 hover:scale-120
        transition-transform duration-300
        uppercase 
        font-bold text-[36px] flex items-center 
        justify-center 
        bg-cover bg-center bg-no-repeat
        rounded-sm`}
      style={{ backgroundImage: `url(${woodBackground})` }}
    >
      <span className="block mr-3">Stack</span>
      <span>{stackNumber}</span>
    </button>
  );
}

export default StackButton;
