"use client"
import {useState, useEffect, createContext, useContext} from 'react';

const ThemeContext=createContext({
    theme: 'dark',
    toggleTheme: ()=>{}
})

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider =  ({children}) => {
    const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
