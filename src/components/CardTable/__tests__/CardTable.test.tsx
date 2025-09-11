import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CardTable from "../index";
import generateRandomUniqueCards from "../../../utils/generateRandomCards";
import type { Props as CardTableProps } from "../index";

const makeProps = (
  overrides: Partial<CardTableProps> = {}
): CardTableProps => ({
  phase: "ask" as "intro" | "deal" | "ask" | "gather" | "reveal" | "done",
  cards: generateRandomUniqueCards(),
  round: 1,
  selectedStack: 0,
  send: vi.fn(),
  ...overrides,
});

describe("CardTable", () => {
  test("renders 21 cards", () => {
    const props = makeProps();
    render(<CardTable {...props} />);
    const cards = screen.getAllByTestId("card"); // add data-testid to your card root
    expect(cards).toHaveLength(21);
  });
});

describe("<CardTable /> stack selection", () => {
  test("clicking middle stack during ASK sends SELECT_STACK event", async () => {
    const user = userEvent.setup();
    const send = vi.fn();
    const props = makeProps({ send, phase: "ask" });

    render(<CardTable {...props} />);

    await user.click(screen.getByTestId("stack-button-1"));

    expect(send).toHaveBeenCalledWith({
      type: "SELECT_STACK",
      selectedStack: 1,
    });
    expect(send).toHaveBeenCalledTimes(1);
  });
});
