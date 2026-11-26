"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  UploadCloud,
  GripVertical,
  Edit2,
  Trash2,
  Check,
  RotateCcw,
  Cloud,
  FileImage,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  tag: string;
  url: string;
  size: string;
  order: number;
}

const initialImages: GalleryImage[] = [
  {
    id: "img-1",
    title: "CCTV Perimeter Deployment",
    tag: "Field Installation",
    url: "/images/profile.jpeg",
    size: "1.4 MB",
    order: 1,
  },
  {
    id: "img-2",
    title: "Server Rack & NVR Hardware Array",
    tag: "Data Center",
    url: "/images/profile.jpeg",
    size: "2.1 MB",
    order: 2,
  },
  {
    id: "img-3",
    title: "Optical Fiber Cable Splice Box",
    tag: "Networking",
    url: "/images/profile.jpeg",
    size: "950 KB",
    order: 3,
  },
  {
    id: "img-4",
    title: "Access Control Bio-Metric Terminal",
    tag: "Security",
    url: "/images/profile.jpeg",
    size: "1.8 MB",
    order: 4,
  },
];

export const ImageGalleryDemo: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTag, setEditTag] = useState("");

  const handleSimulateUpload = () => {
    soundEngine.playClick();
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          soundEngine.playChime();
          const newImg: GalleryImage = {
            id: `img-${Date.now()}`,
            title: `Direct S3 Upload #${images.length + 1}`,
            tag: "AWS S3 Presigned",
            url: "/images/profile.jpeg",
            size: "2.4 MB",
            order: images.length + 1,
          };
          setImages((curr) => [...curr, newImg]);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    soundEngine.playClick();
    const newImages = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    // Reassign orders
    const reordered = newImages.map((img, i) => ({ ...img, order: i + 1 }));
    setImages(reordered);
  };

  const startEdit = (img: GalleryImage) => {
    soundEngine.playClick();
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditTag(img.tag);
  };

  const saveEdit = (id: string) => {
    soundEngine.playClick();
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, title: editTitle, tag: editTag } : img
      )
    );
    setEditingId(null);
  };

  const deleteImage = (id: string) => {
    soundEngine.playClick();
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const resetAll = () => {
    soundEngine.playClick();
    setImages(initialImages);
    setEditingId(null);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#1A1A18] border border-[#3D3D38]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-base text-[#F2EBDD]">
              Direct AWS S3 Presigned Upload & Reordering Sandbox
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E99B3D]/10 text-[#E99B3D] border border-[#E99B3D]/30">
              AWS SDK v3 + Zustand Optimistic UI
            </span>
          </div>
          <p className="text-xs font-mono text-[#88847B] mt-0.5">
            Simulates secure direct-to-S3 client upload, optimistic state reordering, and metadata editing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold transition-all disabled:opacity-50"
          >
            <UploadCloud size={14} />
            <span>Simulate Presigned S3 Upload</span>
          </button>

          <button
            onClick={resetAll}
            className="p-2 rounded-lg bg-[#252522] border border-[#3D3D38] text-[#88847B] hover:text-[#F2EBDD]"
            title="Reset Sample State"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Upload Progress Bar if active */}
      {uploading && (
        <div className="p-3 bg-[#252522] border border-[#E99B3D]/40 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#E99B3D]">
              Direct PUT to s3://media-bucket.s3.ap-south-1.amazonaws.com
            </span>
            <span className="text-[#F2EBDD] font-bold">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#121211] overflow-hidden">
            <div
              className="h-full bg-[#E99B3D] transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Reorderable Image Grid */}
      <div className="flex-1 overflow-y-auto space-y-3">
        <div className="text-xs font-mono uppercase text-[#88847B] flex items-center justify-between">
          <span>Active Gallery Items ({images.length})</span>
          <span>Use arrows to reorder items (persisted sequence)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="p-4 rounded-xl bg-[#1A1A18] border border-[#3D3D38] flex flex-col justify-between space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#252522] border border-[#3D3D38] flex items-center justify-center font-mono font-bold text-xs text-[#E99B3D]">
                    {img.order}
                  </div>
                  <div>
                    {editingId === img.id ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="bg-[#121211] border border-[#E99B3D] rounded px-2 py-1 text-xs text-[#F2EBDD] font-display"
                        />
                        <input
                          type="text"
                          value={editTag}
                          onChange={(e) => setEditTag(e.target.value)}
                          className="bg-[#121211] border border-[#3D3D38] rounded px-2 py-0.5 text-[10px] text-[#88847B] font-mono block"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-display font-bold text-sm text-[#F2EBDD]">
                          {img.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-0.5 rounded">
                            {img.tag}
                          </span>
                          <span className="text-[10px] font-mono text-[#88847B]">
                            {img.size}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit / Delete actions */}
                <div className="flex items-center gap-1">
                  {editingId === img.id ? (
                    <button
                      onClick={() => saveEdit(img.id)}
                      className="p-1.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                    >
                      <Check size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(img)}
                      className="p-1.5 rounded bg-[#252522] text-[#88847B] hover:text-[#F2EBDD] border border-[#3D3D38]"
                    >
                      <Edit2 size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="p-1.5 rounded bg-[#252522] text-[#88847B] hover:text-rose-400 border border-[#3D3D38]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Reordering bar */}
              <div className="pt-2 border-t border-[#3D3D38] flex items-center justify-between text-xs font-mono text-[#88847B]">
                <div className="flex items-center gap-1">
                  <Cloud size={12} className="text-[#E99B3D]" />
                  <span>S3 Direct URL Active</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveImage(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded bg-[#252522] border border-[#3D3D38] disabled:opacity-30 hover:text-[#E99B3D]"
                    title="Move Up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveImage(idx, "down")}
                    disabled={idx === images.length - 1}
                    className="p-1 rounded bg-[#252522] border border-[#3D3D38] disabled:opacity-30 hover:text-[#E99B3D]"
                    title="Move Down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
