"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/svg/Logo";
import { SidebarItems, UserRole } from "@/types";
import { adminRoutes, donorRoutes, requesterRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  DONOR: donorRoutes,
  REQUESTER: requesterRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const routes: SidebarItems = sidebarRoutes[role];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Life</span>
              <span className="text-foreground">Link</span>
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
