import { Navigator } from "./Navigator";

export default function MainLayout({ children }: any) {
  return (
    <div className="grid grid-cols-[24rem_1fr] w-full grid-rows-1 bg-slate-100 h-dvh">
      <nav className="col-[1/2] bg-red-200 border-r-8">
        <Navigator />
      </nav>
      <div className="col-[2/3">{children}</div>
    </div>
  );
}
