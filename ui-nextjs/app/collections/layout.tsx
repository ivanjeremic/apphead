import { client } from "@/apphead/AppHeadClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePlus2, FileText } from "lucide-react";
import { revalidatePath } from "next/cache";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex justify-end">
        <form
          action={async function (formData: FormData) {
            "use server";
            const collectionName = formData.get("name");

            await client.insert({
              collection: "cars",
              data: [{ name: "Xnenia" }, { name: "Polina" }],
            });
            revalidatePath(`/collections`);
          }}
        >
          <input
            className="border border-blue-600 px-4"
            type="text"
            name="name"
          />
          <button className="border border-blue-600 px-4 mr-5" type="submit">
            Add Document
          </button>
        </form>
        <button className="w-auto p-3 text-black border-l-2 border-r-gray-200 border-r  bg-[#f6f7f7] hover:bg-white focus:outline-none">
          <span className="flex gap-2">
            <FileText />
            Edit Collection Schema
          </span>
        </button>
        <button className="w-auto p-3 text-black border-l-2 border-r-gray-200 border-r  bg-[#f6f7f7] hover:bg-white focus:outline-none">
          <span className="flex gap-2">
            <FilePlus2 />
            Add Document
          </span>
        </button>
      </div>
      {children}
    </>
  );
}
