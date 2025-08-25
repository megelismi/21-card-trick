import { AnimatePresence, easeIn, easeOut, motion } from "motion/react";
import meganMagician from "/images/megan_magician.png";

function DialogueBox({
  dialogue,
  visible,
}: {
  dialogue: string | null;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
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
          className="w-[645px] h-[115px] bg-black/50 rounded-lg mt-24 fixed bottom-8 border-[1.5px] border-yellow-600 "
        >
          <div className="pointer-events-auto flex justify-end items-center w-full h-full relative">
            <div className="absolute left-2 bottom-0">
              <img src={meganMagician} className="w-[135px]" />
            </div>

            <div className="magician-font text-white text-[24px] p-4 w-[75%] ">
              <p className="whitespace-pre-line leading-[1.2]">{dialogue}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DialogueBox;
