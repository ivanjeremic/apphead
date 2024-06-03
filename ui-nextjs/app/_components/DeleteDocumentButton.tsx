import { client } from "../../apphead/AppHeadClient";
import { revalidatePath } from "next/cache";

export default function DeleteDocumentButton({
  collection,
  id,
}: {
  collection: string;
  id: string;
}) {
  return (
    <form
      action={async function (formData: FormData) {
        "use server";
        const collectionName = formData.get("name");
        await client.delete({ collection, ids: [id] });
        revalidatePath(`/collections`);
      }}
    >
      <button className="border border-blue-600 px-4" type="submit">
        Delete
      </button>
    </form>
  );
}
