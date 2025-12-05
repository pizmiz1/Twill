import { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    homeEditing: false,
    homeAdding: false,
  });

  const updateHomeEditing = (newHomeEditing) => {
    setGlobalData((prev) => ({ ...prev, homeEditing: newHomeEditing }));
  };

  const updateHomeAdding = (newHomeAdding) => {
    setGlobalData((prev) => ({ ...prev, homeAdding: newHomeAdding }));
  };

  const contextValue = {
    globalData,
    updateHomeEditing,
    updateHomeAdding,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
