import React from "react";

const SessionContext = React.createContext({});

export const SessionProvider = SessionContext.Provider;
export const SessionConsumer = SessionContext.Consumer;
