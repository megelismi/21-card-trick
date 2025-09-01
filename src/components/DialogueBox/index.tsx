import { AnimatePresence, easeIn, easeOut, motion } from "motion/react";
import DialogueNoButton from "./DialogueNoButton";
import DialogueWithButton from "./DialogueWithButton";
import type { CardTrickEvents, Phase } from "../../types/cardTrickMachine";

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
  const isIntro = phase === "intro";
  const isDone = phase === "done";

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
            isIntro || isDone ? "dialogue-with-btn-size" : "dialogue-small-size"
          }`}
        >
          {isIntro ? (
            <DialogueWithButton
              buttonLabel="Ready"
              onClick={() => send({ type: "DEAL" })}
              dialogue={dialogue}
              avatarSize="large"
            />
          ) : isDone ? (
            <DialogueWithButton
              buttonLabel="Encore"
              onClick={() => send({ type: "RESET" })}
              dialogue={dialogue}
              avatarSize="med"
            />
          ) : (
            <DialogueNoButton dialogue={dialogue} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DialogueBox;
