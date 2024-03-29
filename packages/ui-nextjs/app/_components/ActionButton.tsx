"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function ActionButton({ text, Modal }: { text: string; Modal: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} setOpen={setOpen} />
      <button
        type="button"
        className="flex border-l p-2 items-center justify-center text-black text-sm bg-[#f6f7f7] hover:bg-white focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-indigo-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        <PlusIcon className="h-4 w-4 mx-1" aria-hidden="true" />
        {text}
        <span className="sr-only">Add file</span>
      </button>
    </>
  );
}
