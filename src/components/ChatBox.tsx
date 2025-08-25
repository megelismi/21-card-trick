import meganMagician from "/images/megan_magician.png";

function ChatBox({ dialogue }: { dialogue: string }) {
  return (
    <div className="w-[645px] h-[115px] bg-black/50 rounded-lg mt-24 fixed bottom-8 border-[1.5px] border-yellow-600 ">
      <div className="pointer-events-auto flex justify-end items-center w-full h-full relative">
        <div className="absolute left-2 bottom-0">
          <img src={meganMagician} className="w-[135px]" />
        </div>

        <div className="magician-font text-white text-[24px] p-4 w-[75%] ">
          <p className="whitespace-pre-line leading-[1.2]">{dialogue}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
