import { TvIcon } from "@heroicons/react/24/outline";
import { Navigator } from "./Navigator";
import Link from "next/link";


function CollectionsList() {
    const data = [
        {
            id: 1,
            name: "Collection 1",
        },
        {
            id: 2,
            name: "Collection 1",
        },
        {
            id: 3,
            name: "Collection 1",
        },
    ];

    return (
        <>
            {data &&
                data.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/collections/${item.name}`}
                        className="flex items-center p-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        aria-current={item.name ? "page" : undefined}
                    >
                        <TvIcon
                            className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                        <span className="bg-gray-200 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full">
                            {item.name}
                        </span>
                    </Link>
                ))}
        </>
    );
}

export default function MainLayout({ children }: any) {
    return <div className="h-screen">
        <header className="bg-slate-900 h-6 text-white">Apphead</header>
        <div className="flex">
            <nav className="w-96">
                <Navigator>
                    <CollectionsList />
                </Navigator>
            </nav>
            <main className="w-full">{children}</main>
        </div>
    </div>
}
