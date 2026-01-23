import Image from "next/image";
import EmbedSection from "./components/EmbedSection";
import SocialGrid from "./components/SocialGrid";
import Background from "./components/Background";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 relative overflow-hidden">
      
      {/* 4 & 5. Background & Theme Toggle */}
      <Background />
      <ThemeToggle />

      {/* Brand Logo Section */}
      <div className="z-10 mb-12 relative group cursor-default mt-10">
        <div className="absolute inset-0 bg-black/10 dark:bg-white/10 blur-2xl rounded-full group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl bg-white/20 dark:bg-black/20 backdrop-blur-sm">
           <Image 
             src="https://beeimg.com/images/o68822330973.png" 
             alt="Bhoot.com Logo" 
             fill 
             className="object-cover" 
             priority
           />
        </div>
      </div>

      <EmbedSection />
      
      <SocialGrid />

      <footer className="mt-auto text-gray-500 dark:text-white/20 text-xs font-light tracking-widest uppercase transition-colors duration-500">
        &copy; {new Date().getFullYear()} Bhoot.com
      </footer>
    </main>
  );
}
