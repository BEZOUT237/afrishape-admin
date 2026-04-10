import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import HeroManagement from "./pages/HeroManagement";
import AboutManagement from "./pages/AboutManagement";
import ServicesManagement from "./pages/ServicesManagement";
import ProjectsManagement from "./pages/ProjectsManagement";
import TestimonialsManagement from "./pages/TestimonialsManagement";
import BlogManagement from "./pages/BlogManagement";
import MessagesManagement from "./pages/MessagesManagement";
import MediaManagement from "./pages/MediaManagement";
import SettingsManagement from "./pages/SettingsManagement";
import UsersManagement from "./pages/UsersManagement";
import OrientationManagement from "./pages/OrientationManagement";
import PodcastsManagement from "./pages/PodcastsManagement";
import ScholarshipsManagement from "./pages/ScholarshipsManagement";
import ResourcesManagement from "./pages/ResourcesManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "hero", Component: HeroManagement },
      { path: "about", Component: AboutManagement },
      { path: "services", Component: ServicesManagement },
      { path: "projects", Component: ProjectsManagement },
      { path: "testimonials", Component: TestimonialsManagement },
      { path: "blog", Component: BlogManagement },
      { path: "orientation", Component: OrientationManagement },
      { path: "podcasts", Component: PodcastsManagement },
      { path: "scholarships", Component: ScholarshipsManagement },
      { path: "resources", Component: ResourcesManagement },
      { path: "messages", Component: MessagesManagement },
      { path: "media", Component: MediaManagement },
      { path: "settings", Component: SettingsManagement },
      { path: "users", Component: UsersManagement },
    ],
  },
]);