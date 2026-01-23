import Image from "next/image";
import EmbedSection from "./components/EmbedSection";
import SocialGrid from "./components/SocialGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 relative overflow-hidden">
      
      {/* Liquid Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Brand Logo Section */}
      <div className="z-10 mb-12 relative group cursor-default">
        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm">
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

      <footer className="mt-auto text-white/20 text-xs font-light tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Bhoot.com
      </footer>
    </main>
  );
}
