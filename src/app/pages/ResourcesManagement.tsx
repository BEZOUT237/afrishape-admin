import { useState } from "react";
import { useData, Resource } from "../contexts/DataContext";
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
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  Download,
  FileText,
  Video,
} from "lucide-react";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export default function ResourcesManagement() {
  const { resources, setResources } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [formData, setFormData] = useState<Partial<Resource>>({
    title: "",
    description: "",
    category: "guides",
    type: "PDF",
    fileUrl: "",
    coverImage: "",
    fileSize: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    downloadCount: 0,
    published: true,
    tags: [],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "guides",
      type: "PDF",
      fileUrl: "",
      coverImage: "",
      fileSize: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      downloadCount: 0,
      published: true,
      tags: [],
    });
    setEditingResource(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingResource) {
      setResources(
        resources.map((resource) =>
          resource.id === editingResource.id
            ? { ...formData, id: editingResource.id } as Resource
            : resource
        )
      );
      toast.success("Ressource mise à jour avec succès");
    } else {
      const newResource: Resource = {
        ...formData,
        id: Date.now().toString(),
        downloadCount: 0,
      } as Resource;
      setResources([...resources, newResource]);
      toast.success("Ressource créée avec succès");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData(resource);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      setResources(resources.filter((resource) => resource.id !== id));
      toast.success("Ressource supprimée avec succès");
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: resources.length,
    published: resources.filter((r) => r.published).length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloadCount, 0),
    categories: {
      guides: resources.filter((r) => r.category === "guides").length,
      templates: resources.filter((r) => r.category === "templates").length,
      ebooks: resources.filter((r) => r.category === "ebooks").length,
      videos: resources.filter((r) => r.category === "videos").length,
    },
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ressources</CardTitle>
            <FolderOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiées</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Téléchargements</CardTitle>
            <Download className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vidéos</CardTitle>
            <Video className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories.videos}</div>
          </CardContent>
        </Card>
      </div>

      {/* En-tête et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ressources</h2>
          <p className="text-muted-foreground">
            Gérez les ressources téléchargeables (guides, templates, e-books, vidéos)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Ajouter une ressource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? "Modifier la ressource" : "Créer une nouvelle ressource"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de la ressource
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
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
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
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
                        <SelectItem value="guides">Guides</SelectItem>
                        <SelectItem value="templates">Templates</SelectItem>
                        <SelectItem value="ebooks">E-books</SelectItem>
                        <SelectItem value="videos">Vidéos</SelectItem>
                        <SelectItem value="outils">Outils</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type de fichier *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Video">Vidéo</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Link">Lien</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl">URL du fichier ou lien *</Label>
                  <Input
                    id="fileUrl"
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="author">Auteur *</Label>
                    <Input
                      id="author"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileSize">Taille du fichier</Label>
                    <Input
                      id="fileSize"
                      placeholder="4.2 MB"
                      value={formData.fileSize}
                      onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
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
                    <Label htmlFor="downloadCount">Nombre de téléchargements</Label>
                    <Input
                      id="downloadCount"
                      type="number"
                      min="0"
                      value={formData.downloadCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          downloadCount: parseInt(e.target.value) || 0,
                        })
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
                    placeholder="bourses, guide, cv, template"
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
                  <Label htmlFor="published">Publier la ressource</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingResource ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Rechercher une ressource..."
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
            <SelectItem value="guides">Guides</SelectItem>
            <SelectItem value="templates">Templates</SelectItem>
            <SelectItem value="ebooks">E-books</SelectItem>
            <SelectItem value="videos">Vidéos</SelectItem>
            <SelectItem value="outils">Outils</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des ressources ({filteredResources.length})</CardTitle>
          <CardDescription>Gérez toutes vos ressources téléchargeables</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Téléchargements</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucune ressource trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium max-w-xs">
                      {resource.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </TableCell>
                    <TableCell>{resource.author}</TableCell>
                    <TableCell>{resource.downloadCount.toLocaleString()}</TableCell>
                    <TableCell>
                      {resource.published ? (
                        <Badge variant="default">Publiée</Badge>
                      ) : (
                        <Badge variant="secondary">Brouillon</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(resource)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(resource.id)}
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
