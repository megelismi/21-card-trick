/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

interface CardContextType {
  isCollecting: boolean;
  setIsCollecting: Dispatch<SetStateAction<boolean>>;
  selectedStack: number | null;
  setSelectedStack: Dispatch<SetStateAction<number | null>>;
}

// --- 2. Create the context with default undefined ---
const CardContext = createContext<CardContextType | undefined>(undefined);

// --- 3. Provide the context values ---
interface CardProviderProps {
  children: ReactNode;
}

export const CardProvider = ({ children }: CardProviderProps) => {
  const [isCollecting, setIsCollecting] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<number | null>(null);

  return (
    <CardContext.Provider
      value={{ isCollecting, setIsCollecting, selectedStack, setSelectedStack }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = (): CardContextType => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
