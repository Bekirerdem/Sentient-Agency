import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorVariant: 'default',
  setCursorVariant: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
