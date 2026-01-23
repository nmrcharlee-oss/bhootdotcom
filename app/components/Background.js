"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Light Mode Blobs (Warm/Creamy) */}
      <div className="dark:hidden absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-3000"></div>
      </div>

      {/* Dark Mode Blobs (BRIGHTER) */}
      <div className="hidden dark:block absolute top-0 left-0 w-full h-full">
        {/* Changed opacity from 0.3 to 0.6 and colors to lighter shades */}
        <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-purple-500/40 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-blue-500/40 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-indigo-500/40 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[60%] w-60 h-60 bg-violet-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-[5%] right-[25%] w-80 h-80 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>
      </div>

      <div className="absolute inset-0 backdrop-blur-[40px]"></div>
    </div>
  );
}
