// Importe as bibliotecas necessárias
import React, { createContext, useState, useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';

// Crie o contexto de tema
const ThemeContext = createContext();

// Componente provedor de tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const contextValue = { isDarkMode, toggleDarkMode };

  useEffect(() => {
    // Configura a barra de status com base no tema
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDarkMode ? '#000000' : '#ffffff');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
