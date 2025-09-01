import DialogueText from "./DialogueText";
import meganMagician from "/images/megan_magician.png";

function DialogueNoButton({ dialogue }: { dialogue: string | null }) {
  if (!dialogue) return;

  return (
    <div className="pointer-events-auto flex justify-end items-center relative w-full h-full">
      <div className="absolute left-2 bottom-0">
        <img src={meganMagician} className="magician-avatar-small-size" />
      </div>

      <div className="p-4 w-[75%]">
        <DialogueText dialogue={dialogue} />
      </div>
    </div>
  );
}

export default DialogueNoButton;
