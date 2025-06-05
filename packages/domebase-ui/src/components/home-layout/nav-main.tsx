import { ChevronRight, type LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function NavMain({
	items,
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
	handleNavNext: () => unknown
}) {
	return (

		<SidebarGroup>
			<SidebarGroupLabel>Domebase</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton onClick={item.items ? handleNavNext : undefined} asChild tooltip={item.title} className="flex">
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
