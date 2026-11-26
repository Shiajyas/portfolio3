export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121211] text-[#F2EBDD] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-10 h-10 rounded-xl bg-[#E99B3D]/20 border border-[#E99B3D] text-[#E99B3D] font-mono font-bold flex items-center justify-center animate-pulse">
        SA
      </div>
      <div className="text-xs font-mono text-[#88847B] tracking-widest uppercase">
        Initializing Developer World...
      </div>
    </div>
  );
}
