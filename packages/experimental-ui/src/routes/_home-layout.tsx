import { HomeLayout } from "@/components/home-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home-layout")({
	component: App,
});

function App() {
	return (
		<HomeLayout>
			<Outlet />
		</HomeLayout>
	);
}
