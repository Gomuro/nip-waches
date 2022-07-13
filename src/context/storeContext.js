import React, { createContext } from "react";

const StoreContext = createContext({});

export const StoreProvider = StoreContext.Provider;

export default StoreContext;
