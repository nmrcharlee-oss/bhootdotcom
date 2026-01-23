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
    icon: 'https://iili.io/f4Z0537.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${poppins.variable} font-sans antialiased transition-colors duration-500 select-none`}
        onContextMenu={(e) => e.preventDefault()} // Disable Right Click
        onDragStart={(e) => e.preventDefault()}   // Disable Dragging
      >
        <PlayerProvider>
          {children}
        </PlayerProvider>
        
        {/* Source Code Protection Script */}
        <script dangerouslySetInnerHTML={{__html: `
          document.addEventListener('keydown', function(e) {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.keyCode == 123 || 
               (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
               (e.ctrlKey && e.key === 'u')) {
              e.preventDefault();
              return false;
            }
          });
        `}} />
      </body>
    </html>
  );
}
