"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import {
  avataaars,
  bottts,
  funEmoji,
} from "@dicebear/collection";

const stylesMap = {
  humans: avataaars,
  animals: funEmoji,
  robots: bottts,
} as const;

type AvatarPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (avatar: { style: string; seed: string }) => void;
};

type AvatarType = {
  style: string;
  seed: string;
  url: string;
};

export default function AvatarPicker({
  open,
  onClose,
  onSelect,
}: AvatarPickerProps) {
  const [category, setCategory] = useState("humans");
  const [avatars, setAvatars] = useState<AvatarType[]>([]);
  const [selected, setSelected] = useState<AvatarType | null>(null);

  const generateAvatars = (cat: string) => {
    const arr: AvatarType[] = [];

    for (let i = 0; i < 30; i++) {
      const seed = `${cat}-${i}-${Math.random()}`;

      const options: Record<string, string[] | string> = { seed };

      // ✅ Add variety for humans
      if (cat === "humans") {
        options.mood = ["happy"];
      }

      // @ts-expect-error - Mixed DiceBear collections have incompatible option types
      const url = createAvatar(stylesMap[cat as keyof typeof stylesMap], options).toDataUri();

      arr.push({ style: cat, seed, url });
    }

    setAvatars(arr);
  };

  useEffect(() => {
    if (open) generateAvatars(category);
  }, [category, open]);

  // ✅ Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose} // ✅ click outside closes
    >
      <div
        className="bg-white w-[520px] max-h-[85vh] rounded-2xl p-5 flex flex-col relative"
        onClick={(e) => e.stopPropagation()} // prevent close
      >
        {/* ❌ Proper Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Choose Avatar
        </h2>

        {/* Categories */}
        <div className="flex gap-2 mb-4">
          {["humans"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded capitalize ${
                category === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-5 gap-3 overflow-y-auto">
          {avatars.map((a) => (
            <Image
              key={a.seed}
              src={a.url}
              alt={`${a.style} avatar`}
              width={64}
              height={64}
              onClick={() => setSelected(a)}
              className={`rounded-full cursor-pointer border-2 transition
                ${
                  selected?.seed === a.seed
                    ? "border-blue-500 scale-105"
                    : "border-transparent"
                }
              `}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => generateAvatars(category)}
            className="text-sm text-gray-500"
          >
            🎲 Random
          </button>

          <button
            onClick={() => {
              if (selected) {
                onSelect({
                  style: selected.style,
                  seed: selected.seed,
                });
                onClose();
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}