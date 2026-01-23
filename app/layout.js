import { Poppins } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";
import SecurityWrapper from "./components/SecurityWrapper"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bhoot.com",
  description: "Listen to the latest horror stories.",
  icons: {
    icon: 'https://iili.io/f4Z0537.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* FIX: Removed onContextMenu/onDragStart from here. 
         SecurityWrapper handles it now.
      */}
      <body className={`${poppins.variable} font-sans antialiased transition-colors duration-500 select-none`}>
        <PlayerProvider>
          <SecurityWrapper>
            {children}
          </SecurityWrapper>
        </PlayerProvider>
      </body>
    </html>
  );
}
