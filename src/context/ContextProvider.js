import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [collapsed, setCollapsed ] = useState(false);
    const [theme, setTheme] = useState("dark");

    return (
        <StateContext.Provider value={{collapsed, setCollapsed, theme, setTheme}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);