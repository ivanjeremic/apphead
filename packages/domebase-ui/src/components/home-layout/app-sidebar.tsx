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
  ChevronsLeftRightEllipsis,
  ChevronLeft,
  PlusIcon,
  Search,
} from "lucide-react";

import { NavMain } from "@/components/home-layout/nav-main";
import { NavProjects } from "@/components/home-layout/nav-projects";
import { NavSecondary } from "@/components/home-layout/nav-secondary";
import { NavUser } from "@/components/home-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  /* SidebarGroup, */
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { NavSearchForm } from "./nav-search-form";
import { Button } from "../ui/button";

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
      items: [
        {
          title: "Posts",
          url: "/foo",
          icon: UsersRoundIcon,
        },
      ],
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
      items: [],
    },
    {
      title: "MCP",
      url: "#",
      icon: ChevronsLeftRightEllipsisIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [],
    },
  ],
  projects: [
    {
      name: "Plugin Marketplace",
      url: "plugin-marketplace",
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
  const [api, setApi] = useState<CarouselApi>();
  const [canScroll, setCanScroll] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const loader = useLoaderData();
  const navigate = useNavigate();

  // Handle menu item click
  const handleNavNext = () => {
    setCanScroll(false);
    api?.scrollNext();
    setCanScroll(true);
  };

  // Handle back navigation
  const handlNavePrev = () => {
    if (location.pathname !== "/collections/add") {
      api?.scrollPrev();
    }
    navigate(-1);
  };

  useEffect(() => {
    // disable on manual handle Pre/Next this means user clicked back/forward button
    if (canScroll && location.pathname === "/") {
      api?.scrollTo(0);
    }

    if (
      (canScroll && location.pathname === "/collections") ||
      location.pathname.includes("/collections")
    ) {
      api?.scrollTo(1);
    }

    setCanScrollPrev(api?.canScrollPrev() ?? false);
  }, [api, canScroll, location]);

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader /* className="p-0" */>
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
          <SidebarMenuItem className="flex items-center gap-1.5">
            {canScrollPrev && (
              <>
                <SidebarMenuButton
                  size="lg"
                  onClick={handlNavePrev}
                  tooltip={"Back"}
                  className="flex justify-start items-center px-2"
                >
                  <div className="flex">
                    <ChevronLeft />
                  </div>
                </SidebarMenuButton>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowSearch((p) => !p)}
                  className="justify-center"
                >
                  <Search />
                </Button>
                <Button
                  onClick={() => navigate("/collections/add")}
                  variant="outline"
                  size="lg"
                  className="justify-center"
                >
                  <PlusIcon />
                </Button>
              </>
            )}
          </SidebarMenuItem>
          {showSearch && (
            <SidebarMenuItem>
              <SidebarGroupLabel>Search</SidebarGroupLabel>
              <NavSearchForm />
            </SidebarMenuItem>
          )}
        </SidebarMenu>
        {/** NAV SEARCH */}
      </SidebarHeader>
      <SidebarContent>
        <Carousel
          className="h-full"
          setApi={setApi}
          opts={{
            watchDrag: false,
            duration: 20,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <NavMain
                items={data.navMain}
                label="Domebase"
                handleNavNext={handleNavNext}
              />
              <NavProjects projects={data.projects} />
            </CarouselItem>
            <CarouselItem>
              <NavMain
                items={loader?.data.map((i: { collectionName: string }) => ({
                  title: i.collectionName,
                  url: i.collectionName,
                  icon: ChevronsLeftRightEllipsis,
                }))}
                label="Collections"
                handleNavNext={handleNavNext}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
