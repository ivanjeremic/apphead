import { Navigator } from "./Navigator";

export default function MainLayout({ children }: any) {
  return (
    <div className="h-screen">
      <header className="bg-slate-900 h-6 text-white">Apphead</header>
      <div className="flex">
        <nav className="w-96">
          <Navigator />
        </nav>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
