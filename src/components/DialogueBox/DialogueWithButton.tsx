import DialogueText from "./DialogueText";
import meganMagician from "/images/megan-magician.png";

function DialogueButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative overflow-hidden
        magician-font uppercase dialogue-button-font-size
        h-11 w-32 cursor-pointer
        text-black bg-yellow-500 hover:bg-yellow-400
        border-3 border-yellow-700 rounded-sm text-center`}
    >
      {label}
      <span className="shine" />
    </button>
  );
}

function DialogueWithButton({
  dialogue,
  buttonLabel,
  onClick,
  avatarSize,
}: {
  dialogue: string | null;
  buttonLabel: string;
  onClick: () => void;
  avatarSize: "med" | "large";
}) {
  if (!dialogue) return;

  return (
    <div className="pointer-events-auto relative w-full h-full ">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(var(--dialogue-box-with-btn-h)-1px)]">
        <img
          src={meganMagician}
          className={`magician-avatar-${avatarSize}-size max-w-none`}
        />
      </div>

      <div className="py-6 px-4 flex flex-col justify-between h-full ">
        <div className="flex items-center justify-center">
          <DialogueText dialogue={dialogue} />
        </div>
        <div className="flex items-center justify-center">
          <DialogueButton label={buttonLabel} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export default DialogueWithButton;
