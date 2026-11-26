import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121211] text-[#F2EBDD] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#E99B3D]/20 text-[#E99B3D] border border-[#E99B3D] font-mono font-bold text-2xl flex items-center justify-center mx-auto">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#F2EBDD]">
          Sector Not Found
        </h1>
        <p className="text-xs font-mono text-[#88847B] max-w-sm mx-auto">
          The requested coordinate does not exist in Shijay&apos;s developer world. Return to the entrance.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider transition-all"
      >
        <ArrowLeft size={14} />
        <span>Return to Entrance</span>
      </Link>
    </div>
  );
}
