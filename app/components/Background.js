"use client";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Light Mode Blobs (Warm/Creamy colors) */}
      <div className="dark:hidden absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Dark Mode Blobs (Cool/Dark colors) */}
      <div className="hidden dark:block absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-900/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-blue-900/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-indigo-900/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* The Final Blur Layer over the blobs */}
      <div className="absolute inset-0 backdrop-blur-[60px]"></div>
    </div>
  );
}
