import { Poppins } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bhoot.com",
  description: "Listen to the latest horror stories.",
  icons: {
    icon: 'https://beeimg.com/images/o68822330973.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased transition-colors duration-500`}>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
