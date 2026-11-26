"use client";

import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#121211] text-[#F2EBDD] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500 flex items-center justify-center font-mono font-bold text-lg">
        !
      </div>
      <h2 className="text-xl font-display font-bold text-[#F2EBDD]">
        Application Exception
      </h2>
      <p className="text-xs font-mono text-[#88847B] max-w-sm">
        An unexpected error occurred while rendering the interactive canvas.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E99B3D] text-[#121211] font-mono text-xs font-bold"
      >
        <RotateCcw size={14} />
        <span>Reinitialize State</span>
      </button>
    </div>
  );
}
