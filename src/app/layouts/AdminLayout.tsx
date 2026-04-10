import { Outlet } from "react-router";
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
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import {
  LayoutDashboard,
  Image,
  Info,
  Briefcase,
  FolderKanban,
  MessageSquare,
  FileText,
  Mail,
  ImageIcon,
  Settings,
  Users,
  Compass,
  Mic,
  GraduationCap,
  FolderOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const menuItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, path: "/" },
  { title: "Section Hero", icon: Image, path: "/hero" },
  { title: "À propos", icon: Info, path: "/about" },
  { title: "Services", icon: Briefcase, path: "/services" },
  { title: "Projets", icon: FolderKanban, path: "/projects" },
  { title: "Témoignages", icon: MessageSquare, path: "/testimonials" },
  { title: "Blog", icon: FileText, path: "/blog" },
  { title: "Orientation", icon: Compass, path: "/orientation" },
  { title: "Podcasts", icon: Mic, path: "/podcasts" },
  { title: "Bourses", icon: GraduationCap, path: "/scholarships" },
  { title: "Ressources", icon: FolderOpen, path: "/resources" },
  { title: "Messages", icon: Mail, path: "/messages" },
  { title: "Médias", icon: ImageIcon, path: "/media" },
  { title: "Utilisateurs", icon: Users, path: "/users" },
  { title: "Paramètres", icon: Settings, path: "/settings" },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold">A</span>
              </div>
              <div>
                <h2 className="font-semibold">AfriShape</h2>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.path}>
                            <Icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="border-b bg-background px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
              </h1>
            </div>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}