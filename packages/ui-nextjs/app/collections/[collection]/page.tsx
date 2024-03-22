import { client } from "@/apphead/AppHeadClient";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FilePenLine, FileText, UnfoldVertical } from "lucide-react";
import Link from "next/link";

function DocDeppMap({ doc, children }: any) {
  return Object.entries(doc).map(([field, value]): any =>
    typeof value === "object" ? (
      <DocDeppMap doc={value}>
        {(nDoc: any) => <div className="ml-4">{children(nDoc)}</div>}
      </DocDeppMap>
    ) : (
      children([field, value])
    )
  );
}

function DocumentsTable({ data, collection }: any) {
  return (
    <>
      {data.map((item: any) => (
        <Collapsible className="p-4 w-full bg-white" key={item.id}>
          <CollapsibleTrigger className="w-full border">
            <ul className="text-left">
              <li className="mb-2 bg-gray-100 p-2 flex items-center justify-between">
                <span className="flex gap-2">
                  <FileText /> {item.id}
                </span>
                <Link href={collection + "/" + item.id}>
                  <Button>
                    <FilePenLine className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
              </li>

              <DocDeppMap doc={item}>
                {([field, value]: any) => (
                  <li className="ml-2">
                    {field}: {value}
                  </li>
                )}
              </DocDeppMap>

              <li className="flex h-8 text-xs border-t">
                <button className="flex items-center justify-center gap-2 p-2 w-full hover:bg-gray-50">
                  <UnfoldVertical /> Expand Document
                </button>
              </li>
            </ul>
          </CollapsibleTrigger>
          <CollapsibleContent className="border p-2">
            <ul>
              <DocDeppMap doc={item}>
                {([field, value]: any) => (
                  <li>
                    {field}: {value}
                  </li>
                )}
              </DocDeppMap>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}

export default async function Page({
  params,
}: {
  params: { collection: string };
}) {
  const data = await client.find({ collection: params.collection });
  return <DocumentsTable data={data} collection={params.collection} />;
}
