import { useData } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  FileText,
  FolderKanban,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Compass,
  Mic,
  GraduationCap,
  FolderOpen,
} from "lucide-react";

export default function Dashboard() {
  const {
    blogPosts,
    projects,
    testimonials,
    messages,
    users,
    orientationGuides,
    podcasts,
    scholarships,
    resources,
  } = useData();

  const stats = [
    {
      title: "Guides d'orientation",
      value: orientationGuides.length,
      icon: Compass,
      description: `${orientationGuides.filter((g) => g.published).length} publiés`,
      color: "text-indigo-600",
    },
    {
      title: "Podcasts",
      value: podcasts.length,
      icon: Mic,
      description: `${podcasts.reduce((sum, p) => sum + p.listens, 0).toLocaleString()} écoutes`,
      color: "text-violet-600",
    },
    {
      title: "Bourses",
      value: scholarships.length,
      icon: GraduationCap,
      description: `${scholarships.filter((s) => s.published).length} disponibles`,
      color: "text-amber-600",
    },
    {
      title: "Ressources",
      value: resources.length,
      icon: FolderOpen,
      description: `${resources.reduce((sum, r) => sum + r.downloadCount, 0).toLocaleString()} téléchargements`,
      color: "text-emerald-600",
    },
    {
      title: "Articles de blog",
      value: blogPosts.length,
      icon: FileText,
      description: `${blogPosts.filter((p) => p.published).length} publiés`,
      color: "text-blue-600",
    },
    {
      title: "Messages",
      value: messages.length,
      icon: Mail,
      description: `${messages.filter((m) => !m.read).length} non lus`,
      color: "text-orange-600",
    },
  ];

  const recentMessages = messages.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Bienvenue sur AfriShape Admin</h2>
        <p className="text-muted-foreground">
          Média éducatif africain - Gérez l'orientation, les bourses, les podcasts et les ressources
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`size-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Messages récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <Mail className={`mt-1 size-4 ${!message.read ? "text-blue-600" : "text-muted-foreground"}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.name}</p>
                        {!message.read && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                            Nouveau
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                      <p className="text-xs text-muted-foreground">{message.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Aucun message</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu récent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Compass className="mt-1 size-4 text-indigo-600" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {orientationGuides.length} guides d'orientation
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Aide aux bacheliers et étudiants
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Mic className="mt-1 size-4 text-violet-600" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{podcasts.length} épisodes de podcast</p>
                  <p className="text-xs text-muted-foreground">
                    Témoignages et conseils audio
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <GraduationCap className="mt-1 size-4 text-amber-600" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{scholarships.length} bourses d'études</p>
                  <p className="text-xs text-muted-foreground">
                    Opportunités internationales
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Raccourcis rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent">
              <Compass className="size-5 text-indigo-600" />
              <div>
                <p className="font-medium">Nouveau guide</p>
                <p className="text-xs text-muted-foreground">Guide d'orientation</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent">
              <Mic className="size-5 text-violet-600" />
              <div>
                <p className="font-medium">Nouveau podcast</p>
                <p className="text-xs text-muted-foreground">Épisode audio</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent">
              <GraduationCap className="size-5 text-amber-600" />
              <div>
                <p className="font-medium">Nouvelle bourse</p>
                <p className="text-xs text-muted-foreground">Opportunité d'étude</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent">
              <FolderOpen className="size-5 text-emerald-600" />
              <div>
                <p className="font-medium">Nouvelle ressource</p>
                <p className="text-xs text-muted-foreground">Document ou vidéo</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}