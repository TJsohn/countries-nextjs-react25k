"use client";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#43ea7f", // Vibrant green
      light: "#7fffd4",
      dark: "#009e4f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffe066", // Soft yellow
      light: "#fff9c4",
      dark: "#ffd600",
      contrastText: "#222",
    },
    info: {
      main: "#00bcd4",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#fff",
    },
    customPurple: {
      main: "#8e24aa",
      contrastText: "#fff",
    },
    customGreen: {
      main: "#43ea7f",
      contrastText: "#fff",
    },
    background: {
      default: "#eafbe7", // soft green background
      paper: "#fffde7",   // light yellow for cards/paper
    },
    text: {
      primary: "#222",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 300,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

// Define dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#43ea7f", // Vibrant green
      light: "#7fffd4",
      dark: "#009e4f",
      contrastText: "#222",
    },
    secondary: {
      main: "#ffe066", // Soft yellow
      light: "#fff9c4",
      dark: "#ffd600",
      contrastText: "#222",
    },
    info: {
      main: "#00bcd4",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#fff",
    },
    customPurple: {
      main: "#8e24aa",
      contrastText: "#fff",
    },
    customGreen: {
      main: "#43ea7f",
      contrastText: "#fff",
    },
    background: {
      default: "#1a2b1a", // deep green for dark mode
      paper: "#232b1a",   // olive/greenish dark for cards/paper
    },
    text: {
      primary: "#fff",
      secondary: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 300,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export function CustomThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true);

    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference:
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("theme-mode", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isHydrated]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode: isHydrated ? isDarkMode : false,
    toggleTheme,
    theme: isDarkMode ? darkTheme : lightTheme,
    isHydrated,
  };

  // Only render Material-UI providers after hydration to prevent CSS injection mismatch
  if (!isHydrated) {
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a Theme Provider");
  }
  return context;
}