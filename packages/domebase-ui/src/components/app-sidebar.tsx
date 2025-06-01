import {
	ChevronsLeftRightEllipsisIcon,
	LayoutDashboard,
	Command,
	Frame,
	LifeBuoy,
	Map as MapIcon,
	PieChart,
	Send,
	Settings2,
	/* 	SquareTerminal, */
	AppWindow,
	ImagePlayIcon,
	PlugIcon,
	FunctionSquareIcon,
	UsersRoundIcon,
	DatabaseIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "Collections",
			url: "/collections",
			icon: DatabaseIcon,
		},
		{
			title: "Users",
			url: "/users",
			icon: UsersRoundIcon,
		},
		{
			title: "Media",
			url: "#",
			icon: ImagePlayIcon,
		},
		{
			title: "Website",
			url: "/website",
			icon: AppWindow,
		},
		{
			title: "Plugins",
			url: "#",
			icon: PlugIcon,
		},
		{
			title: "Functions",
			url: "/functions",
			icon: FunctionSquareIcon,
		},
		{
			title: "MCP",
			url: "#",
			icon: ChevronsLeftRightEllipsisIcon,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
		},
	],
	projects: [
		{
			name: "Plugin Marketplace",
			url: "#",
			icon: Frame,
		},
		{
			name: "Theme Marketplace",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Documentation",
			url: "#",
			icon: MapIcon,
		},
		{
			name: "Discord",
			url: "#",
			icon: MapIcon,
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Acme Inc</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
