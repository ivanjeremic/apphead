import { Input } from "@/components/ui/input";
import { client } from "../apphead/AppHeadClient";
import { redirect } from "next/navigation";

export default function Home({ searchParams }: any) {
  return (
    <form
      action={async function (formData: FormData) {
        "use server";
        const collectionName = formData.get("name");
        await client.addCollection(collectionName as string);
        redirect(`/collections`);
      }}
    >
      <Input type="text" name="name" className="w-4" />
      <button className="border border-blue-600 px-4" type="submit">
        Add Collection.
      </button>
    </form>
  );
}
