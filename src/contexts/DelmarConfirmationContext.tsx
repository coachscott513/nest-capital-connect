import { createContext, useContext, useState, ReactNode } from "react";

interface DelmarConfirmationContextType {
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
}

const DelmarConfirmationContext = createContext<DelmarConfirmationContextType | undefined>(undefined);

export const DelmarConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <DelmarConfirmationContext.Provider value={{ showConfirmation, setShowConfirmation }}>
      {children}
    </DelmarConfirmationContext.Provider>
  );
};

export const useDelmarConfirmation = () => {
  const context = useContext(DelmarConfirmationContext);
  if (!context) {
    throw new Error("useDelmarConfirmation must be used within a DelmarConfirmationProvider");
  }
  return context;
};
