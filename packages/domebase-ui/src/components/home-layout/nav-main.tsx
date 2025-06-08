import { ChevronRight, type LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function NavMain({
	items,
	label,
	handleNavNext
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
	label: string,
	handleNavNext: () => unknown
}) {
	const location = useLocation()

	return (

		<SidebarGroup>
			<SidebarGroupLabel>{label}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton isActive={item.url === location.pathname} onClick={item.items ? handleNavNext : undefined} asChild tooltip={item.title} className="flex">
							<Link to={item.url}>
								<item.icon />
								<span>{item.title}</span>
								{item.items && (
									<ChevronRight className="ml-auto" />
								)}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
