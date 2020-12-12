import React from 'react';
import RootStore from './RootStore';

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  return <storeContext.Provider value={new RootStore()}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);

  if (!store) throw new Error('useStore must be used within a StoreProvider.');

  return store;
};
