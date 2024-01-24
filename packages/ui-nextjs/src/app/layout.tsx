import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigator } from "./_components/Navigator";
import CollectionsList from "./_components/CollectionsList";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apphead | Next generation App Platform",
  description: "Next generation App Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-[384px_1fr] grid-rows-[auto_1fr_auto] h-screen">
          <header className="bg-black col-[1/3] row-[1/2]">Top</header>
          <ScrollArea className="col-[1/2] row-[2/3]">
            <Navigator>
              <CollectionsList />
            </Navigator>
          </ScrollArea>
          <ScrollArea className="bg-green-200 col-[2/3] row-[2/3]">
            {children}
          </ScrollArea>
          <footer className="bg-orange-200 col-[1/3] row-[3/4]">Footer</footer>
        </div>
      </body>
    </html>
  );
}
