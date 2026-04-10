import { useState } from "react";
import { useData, Podcast } from "../contexts/DataContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, Pencil, Trash2, Mic, Headphones, Play, TrendingUp } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export default function PodcastsManagement() {
  const { podcasts, setPodcasts } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [formData, setFormData] = useState<Partial<Podcast>>({
    title: "",
    description: "",
    category: "orientation",
    audioUrl: "",
    duration: "",
    coverImage: "",
    host: "",
    guest: "",
    date: new Date().toISOString().split("T")[0],
    published: true,
    listens: 0,
    tags: [],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "orientation",
      audioUrl: "",
      duration: "",
      coverImage: "",
      host: "",
      guest: "",
      date: new Date().toISOString().split("T")[0],
      published: true,
      listens: 0,
      tags: [],
    });
    setEditingPodcast(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPodcast) {
      setPodcasts(
        podcasts.map((podcast) =>
          podcast.id === editingPodcast.id
            ? { ...formData, id: editingPodcast.id } as Podcast
            : podcast
        )
      );
      toast.success("Podcast mis à jour avec succès");
    } else {
      const newPodcast: Podcast = {
        ...formData,
        id: Date.now().toString(),
        listens: 0,
      } as Podcast;
      setPodcasts([...podcasts, newPodcast]);
      toast.success("Podcast créé avec succès");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    setFormData(podcast);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce podcast ?")) {
      setPodcasts(podcasts.filter((podcast) => podcast.id !== id));
      toast.success("Podcast supprimé avec succès");
    }
  };

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesSearch =
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || podcast.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: podcasts.length,
    published: podcasts.filter((p) => p.published).length,
    totalListens: podcasts.reduce((sum, p) => sum + p.listens, 0),
    avgListens: Math.round(
      podcasts.reduce((sum, p) => sum + p.listens, 0) / podcasts.length || 0
    ),
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
            <Mic className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
            <Play className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Écoutes</CardTitle>
            <Headphones className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListens.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moy. Écoutes</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgListens}</div>
          </CardContent>
        </Card>
      </div>

      {/* En-tête et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Podcasts</h2>
          <p className="text-muted-foreground">
            Gérez les épisodes de podcast éducatifs
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Ajouter un podcast
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPodcast ? "Modifier le podcast" : "Créer un nouveau podcast"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'épisode de podcast
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de l'épisode *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orientation">Orientation</SelectItem>
                        <SelectItem value="bourses">Bourses</SelectItem>
                        <SelectItem value="témoignages">Témoignages</SelectItem>
                        <SelectItem value="carrières">Carrières</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée (mm:ss) *</Label>
                    <Input
                      id="duration"
                      required
                      placeholder="45:30"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audioUrl">URL du fichier audio *</Label>
                  <Input
                    id="audioUrl"
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="host">Animateur *</Label>
                    <Input
                      id="host"
                      required
                      value={formData.host}
                      onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guest">Invité (optionnel)</Label>
                    <Input
                      id="guest"
                      value={formData.guest}
                      onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date de publication</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="listens">Nombre d'écoutes</Label>
                    <Input
                      id="listens"
                      type="number"
                      min="0"
                      value={formData.listens}
                      onChange={(e) =>
                        setFormData({ ...formData, listens: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">URL de l'image de couverture</Label>
                  <Input
                    id="coverImage"
                    type="url"
                    placeholder="https://..."
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    placeholder="harvard, bourses, témoignage"
                    value={formData.tags?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(",").map((tag) => tag.trim()),
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Publier le podcast</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">{editingPodcast ? "Mettre à jour" : "Créer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Rechercher un podcast..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-80"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="orientation">Orientation</SelectItem>
            <SelectItem value="bourses">Bourses</SelectItem>
            <SelectItem value="témoignages">Témoignages</SelectItem>
            <SelectItem value="carrières">Carrières</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des podcasts ({filteredPodcasts.length})</CardTitle>
          <CardDescription>Gérez tous vos épisodes de podcast</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Animateur</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Écoutes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPodcasts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucun podcast trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredPodcasts.map((podcast) => (
                  <TableRow key={podcast.id}>
                    <TableCell className="font-medium max-w-xs">
                      {podcast.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{podcast.category}</Badge>
                    </TableCell>
                    <TableCell>{podcast.host}</TableCell>
                    <TableCell>{podcast.duration}</TableCell>
                    <TableCell>{podcast.listens.toLocaleString()}</TableCell>
                    <TableCell>
                      {podcast.published ? (
                        <Badge variant="default">Publié</Badge>
                      ) : (
                        <Badge variant="secondary">Brouillon</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(podcast)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(podcast.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
