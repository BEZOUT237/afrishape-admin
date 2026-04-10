import { useState } from "react";
import { useData, OrientationGuide } from "../contexts/DataContext";
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
import { Plus, Pencil, Trash2, Eye, BookOpen, Users, Target } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export default function OrientationManagement() {
  const { orientationGuides, setOrientationGuides } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<OrientationGuide | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [formData, setFormData] = useState<Partial<OrientationGuide>>({
    title: "",
    description: "",
    category: "post-bac",
    targetAudience: "bacheliers",
    content: "",
    image: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    published: true,
    tags: [],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "post-bac",
      targetAudience: "bacheliers",
      content: "",
      image: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      published: true,
      tags: [],
    });
    setEditingGuide(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingGuide) {
      setOrientationGuides(
        orientationGuides.map((guide) =>
          guide.id === editingGuide.id ? { ...formData, id: editingGuide.id } as OrientationGuide : guide
        )
      );
      toast.success("Guide d'orientation mis à jour avec succès");
    } else {
      const newGuide: OrientationGuide = {
        ...formData,
        id: Date.now().toString(),
      } as OrientationGuide;
      setOrientationGuides([...orientationGuides, newGuide]);
      toast.success("Guide d'orientation créé avec succès");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (guide: OrientationGuide) => {
    setEditingGuide(guide);
    setFormData(guide);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce guide ?")) {
      setOrientationGuides(orientationGuides.filter((guide) => guide.id !== id));
      toast.success("Guide supprimé avec succès");
    }
  };

  const filteredGuides = orientationGuides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || guide.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: orientationGuides.length,
    published: orientationGuides.filter((g) => g.published).length,
    categories: {
      postBac: orientationGuides.filter((g) => g.category === "post-bac").length,
      universitaire: orientationGuides.filter((g) => g.category === "universitaire").length,
      professionnel: orientationGuides.filter((g) => g.category === "professionnel").length,
    },
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
            <Eye className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post-Bac</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories.postBac}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professionnel</CardTitle>
            <Target className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories.professionnel}</div>
          </CardContent>
        </Card>
      </div>

      {/* En-tête et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guides d'Orientation</h2>
          <p className="text-muted-foreground">
            Gérez les guides pour aider les bacheliers et étudiants dans leur orientation
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Ajouter un guide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGuide ? "Modifier le guide" : "Créer un nouveau guide"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations du guide d'orientation
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
                  <Label htmlFor="description">Description courte *</Label>
                  <Textarea
                    id="description"
                    required
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
                        <SelectItem value="post-bac">Post-Bac</SelectItem>
                        <SelectItem value="universitaire">Universitaire</SelectItem>
                        <SelectItem value="professionnel">Professionnel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Public cible *</Label>
                    <Select
                      value={formData.targetAudience}
                      onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bacheliers">Bacheliers</SelectItem>
                        <SelectItem value="étudiants">Étudiants</SelectItem>
                        <SelectItem value="diplômés">Diplômés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenu complet *</Label>
                  <Textarea
                    id="content"
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Rédigez le contenu complet du guide..."
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
                    <Label htmlFor="date">Date de publication</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image de couverture</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    placeholder="orientation, bac, carrière"
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
                  <Label htmlFor="published">Publier le guide</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingGuide ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Rechercher un guide..."
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
            <SelectItem value="post-bac">Post-Bac</SelectItem>
            <SelectItem value="universitaire">Universitaire</SelectItem>
            <SelectItem value="professionnel">Professionnel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des guides ({filteredGuides.length})</CardTitle>
          <CardDescription>
            Gérez tous vos guides d'orientation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucun guide trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuides.map((guide) => (
                  <TableRow key={guide.id}>
                    <TableCell className="font-medium">{guide.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{guide.category}</Badge>
                    </TableCell>
                    <TableCell>{guide.targetAudience}</TableCell>
                    <TableCell>{guide.author}</TableCell>
                    <TableCell>
                      {new Date(guide.date).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      {guide.published ? (
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
                          onClick={() => handleEdit(guide)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(guide.id)}
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
