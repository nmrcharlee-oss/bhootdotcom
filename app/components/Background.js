"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Light Mode Blobs (Warm/Creamy) */}
      <div className="dark:hidden absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        {/* New Shapes */}
        <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-3000"></div>
      </div>

      {/* Dark Mode Blobs (Cool/Deep) */}
      <div className="hidden dark:block absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-blue-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-indigo-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        {/* New Shapes */}
        <div className="absolute top-[40%] left-[60%] w-60 h-60 bg-violet-900/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-[5%] right-[25%] w-80 h-80 bg-blue-800/40 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
      </div>

      {/* Reduced blur slightly from 60px to 40px so shapes are more visible */}
      <div className="absolute inset-0 backdrop-blur-[40px]"></div>
    </div>
  );
}
