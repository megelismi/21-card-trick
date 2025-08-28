import { AnimatePresence, easeIn, easeOut, motion } from "motion/react";
import meganMagician from "/images/megan_magician.png";
import type { CardTrickEvents, Phase } from "../types/cardTrickMachine";

function GameDialogue({ dialogue }: { dialogue: string | null }) {
  if (!dialogue) return;

  return (
    <div className="pointer-events-auto flex justify-end items-center relative w-full h-full">
      <div className="absolute left-2 bottom-0">
        <img src={meganMagician} className="magician-avatar-footer-size" />
      </div>

      <div className="magician-font text-white text-[24px] p-4 w-[75%] ">
        <p className="whitespace-pre-line leading-[1.2]">{dialogue}</p>
      </div>
    </div>
  );
}

function IntroDialogue({
  dialogue,
  send,
}: {
  dialogue: string | null;
  send: (arg0: CardTrickEvents) => void;
}) {
  if (!dialogue) return;

  return (
    <div className="pointer-events-auto relative w-full h-full">
      <div className="absolute left-14 bottom-[calc(var(--dialogue-box-full-h)-1px)]">
        <img src={meganMagician} className="magician-avatar-full-size" />
      </div>

      <div className="py-6 px-4 flex flex-col justify-between h-full ">
        <div className=" flex items-center justify-center">
          <p className="whitespace-pre-line leading-[1.2] magician-font text-white text-[24px]">
            {dialogue}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => send({ type: "DEAL" })}
            type="button"
            className="
              relative overflow-hidden
              magician-font uppercase text-[30px]
              h-11 w-32 cursor-pointer
              text-black bg-yellow-500 hover:bg-yellow-400
              border-3 border-yellow-700 rounded-sm text-center
            "
          >
            Ready
            <span className="shine" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DoneDialogue({
  dialogue,
  send,
}: {
  dialogue: string | null;
  send: (arg0: CardTrickEvents) => void;
}) {
  if (!dialogue) return;

  // bottom-[calc(var(--dialogue-box-med-h)-1px)]

  return (
    <div className="pointer-events-auto relative w-full h-full">
      <div className="absolute left-45 bottom-[calc(var(--dialogue-box-med-h)-1px)]">
        <img src={meganMagician} className="megan-avatar-med-size" />
      </div>

      <div className="py-6 px-4 flex flex-col justify-between h-full ">
        <div className="flex items-center justify-center">
          <p className="whitespace-pre-line leading-[1.2] magician-font text-white text-[24px]">
            {dialogue}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => send({ type: "RESET" })}
            type="button"
            className="
              relative overflow-hidden
              magician-font uppercase text-[30px]
              h-11 w-32 cursor-pointer
              text-black bg-yellow-500 hover:bg-yellow-400
              border-3 border-yellow-700 rounded-sm text-center
            "
          >
            Restart
            <span className="shine" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DialogueBox({
  dialogue,
  visible,
  phase,
  send,
}: {
  dialogue: string | null;
  visible: boolean;
  phase: Phase;
  send: (arg0: CardTrickEvents) => void;
}) {
  const isIntroDialogue = phase === "intro";
  const isDoneDialogue = phase === "done";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.95, 1.05, 1],
            transition: { duration: 0.2, ease: easeIn },
          }}
          exit={{
            opacity: [1, 1, 0],
            y: 20,
            transition: { duration: 0.1, ease: easeOut },
          }}
          className={`bg-black/50 rounded-lg mt-24 border-[1.5px] border-yellow-600 fixed bottom-8 ${
            isIntroDialogue
              ? "dialogue-full-size"
              : isDoneDialogue
              ? "dialogue-med-size"
              : "dialogue-footer-size"
          }`}
        >
          {isIntroDialogue ? (
            <IntroDialogue send={send} dialogue={dialogue} />
          ) : isDoneDialogue ? (
            <DoneDialogue send={send} dialogue={dialogue} />
          ) : (
            <GameDialogue dialogue={dialogue} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DialogueBox;
