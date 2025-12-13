import { ReactNode, useState } from "react";
import { GlobalContext } from "./globalContext";
import { GlobalContextType } from "../types/globalContextType";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [modules, setModules] = useState([]);

  const updateModules = (newModules: []) => {
    setModules(newModules);
  };

  const contextValue: GlobalContextType = {
    modules,
    updateModules,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
