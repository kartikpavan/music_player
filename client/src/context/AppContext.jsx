import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initialState } from "../reducers/initialState";
import reducer from "../reducers/reducer";

const AppContext = createContext();

export const AppProviderContext = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// custom hook to get all the state values from any component
export const useGlobalContext = () => useContext(AppContext);
