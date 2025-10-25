import Navigation from "@/components/Navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { CustomThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Countries Explorer | TJ Sohn",
  description: "Discover and favorite countries around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* Preload Google/Geist font files for performance and warning suppression */}
        <link
          rel="preload"
          href="/_next/static/media/797e433ab948586e-s.p.dbea232f.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/caa3a2e1cccd8315-s.p.853070df.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CustomThemeProvider>
            <AuthProvider>
              <StoreProvider>
                <Navigation>
                  <main style={{ flex: 1 }}>{children}</main>
                </Navigation>
              </StoreProvider>
            </AuthProvider>
          </CustomThemeProvider>
          <footer
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              width: "100%",
              textAlign: "center",
              padding: "16px 0",
              background: "#ffe066",
              color: "#222",
              fontWeight: "bold",
              zIndex: 100,
            }}
          >
            © 2025 TJ Sohn | Made with ❤️ for React Advanced
          </footer>
        </div>
      </body>
    </html>
  );
}
