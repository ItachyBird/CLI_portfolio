import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const TerminalThemeContext = createContext();

const themeConfigs = {
  green: {
    color: 'green',
    wallpaper: '/wallpaper0.png',
  },
  raincity: {
    color: '#b200ff',
    wallpaper: '/wallpaper1.gif',
  },
  mars: {
    color: '#ffae42',
    wallpaper: '/wallpaper2.gif',
  },
  pokemon: {
    color: '#00ffff',
    wallpaper: '/wallpaper3.gif',
  },
  cybercity: {
    color: '#ffcc00',
    wallpaper: '/wallpaper4.gif',
  },
  thegame: {
    color: '#ff66cc',
    wallpaper: '/wallpaper5.gif',
  },
  apocalyptic: {
    color: '#00ffcc',
    wallpaper: '/wallpaper6.gif',
  },
  room: {
    color: '#f8f8ff',
    wallpaper: '/wallpaper7.gif',
  },
};


const getValidTheme = () => {
  const stored = localStorage.getItem('terminalTheme');
  return themeConfigs[stored] ? stored : 'green';
};

export function useTerminalTheme() {
  return useContext(TerminalThemeContext);
}

export function TerminalThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState(getValidTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-terminal-theme', themeColor);
    localStorage.setItem('terminalTheme', themeColor);
  }, [themeColor]);

  const changeTheme = (color) => {
    if (themeConfigs[color]) {
      setThemeColor(color);
    } else {
      console.warn(`Invalid terminal theme: "${color}"`);
    }
  };

  const value = useMemo(() => ({
    themeColor,
    themeConfig: themeConfigs[themeColor],
    changeTheme,
  }), [themeColor]);

  return (
    <TerminalThemeContext.Provider value={value}>
      {children}
    </TerminalThemeContext.Provider>
  );
}
