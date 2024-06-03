import { revalidatePath } from "next/cache";
import { client } from "../../apphead/AppHeadClient";

export default function Page() {
  return (
    <div className="bg-white">
      <h1>Collection</h1>
    </div>
  );
}
