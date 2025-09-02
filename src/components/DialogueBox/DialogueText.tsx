function DialogueText({ dialogue }: { dialogue: string }) {
  return (
    <p className="whitespace-pre-line leading-[1.2] magician-font text-white dialogue-font-size">
      {dialogue}
    </p>
  );
}

export default DialogueText;
