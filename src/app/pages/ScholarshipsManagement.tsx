import { useState } from "react";
import { useData, Scholarship } from "../contexts/DataContext";
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
  GraduationCap,
  Globe,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export default function ScholarshipsManagement() {
  const { scholarships, setScholarships } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState<string>("all");

  const [formData, setFormData] = useState<Partial<Scholarship>>({
    title: "",
    description: "",
    country: "",
    university: "",
    level: "Master",
    fieldOfStudy: [],
    deadline: "",
    amount: "",
    requirements: [],
    applicationLink: "",
    coverageType: "Totale",
    image: "",
    published: true,
    eligibility: "",
    tags: [],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      country: "",
      university: "",
      level: "Master",
      fieldOfStudy: [],
      deadline: "",
      amount: "",
      requirements: [],
      applicationLink: "",
      coverageType: "Totale",
      image: "",
      published: true,
      eligibility: "",
      tags: [],
    });
    setEditingScholarship(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingScholarship) {
      setScholarships(
        scholarships.map((scholarship) =>
          scholarship.id === editingScholarship.id
            ? { ...formData, id: editingScholarship.id } as Scholarship
            : scholarship
        )
      );
      toast.success("Bourse mise à jour avec succès");
    } else {
      const newScholarship: Scholarship = {
        ...formData,
        id: Date.now().toString(),
      } as Scholarship;
      setScholarships([...scholarships, newScholarship]);
      toast.success("Bourse créée avec succès");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setFormData(scholarship);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette bourse ?")) {
      setScholarships(scholarships.filter((scholarship) => scholarship.id !== id));
      toast.success("Bourse supprimée avec succès");
    }
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry =
      filterCountry === "all" || scholarship.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const stats = {
    total: scholarships.length,
    published: scholarships.filter((s) => s.published).length,
    countries: new Set(scholarships.map((s) => s.country)).size,
    fullCoverage: scholarships.filter((s) => s.coverageType === "Totale").length,
  };

  const uniqueCountries = Array.from(new Set(scholarships.map((s) => s.country))).sort();

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bourses</CardTitle>
            <GraduationCap className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiées</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pays</CardTitle>
            <Globe className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.countries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Couverture Totale</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fullCoverage}</div>
          </CardContent>
        </Card>
      </div>

      {/* En-tête et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bourses d'Études</h2>
          <p className="text-muted-foreground">
            Gérez les opportunités de bourses pour les étudiants africains
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Ajouter une bourse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingScholarship ? "Modifier la bourse" : "Créer une nouvelle bourse"}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de la bourse d'études
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Nom de la bourse *</Label>
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
                    <Label htmlFor="country">Pays *</Label>
                    <Input
                      id="country"
                      required
                      placeholder="France, Canada, etc."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">Université/Organisation *</Label>
                    <Input
                      id="university"
                      required
                      value={formData.university}
                      onChange={(e) =>
                        setFormData({ ...formData, university: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="level">Niveau *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Licence">Licence</SelectItem>
                        <SelectItem value="Master">Master</SelectItem>
                        <SelectItem value="Doctorat">Doctorat</SelectItem>
                        <SelectItem value="Post-doctorat">Post-doctorat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverageType">Type de couverture *</Label>
                    <Select
                      value={formData.coverageType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, coverageType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Totale">Totale</SelectItem>
                        <SelectItem value="Partielle">Partielle</SelectItem>
                        <SelectItem value="Frais de scolarité uniquement">
                          Frais de scolarité uniquement
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant *</Label>
                    <Input
                      id="amount"
                      required
                      placeholder="1,400€/mois"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Domaines d'études (séparés par des virgules) *</Label>
                  <Input
                    id="fieldOfStudy"
                    required
                    placeholder="Ingénierie, Médecine, Sciences Sociales"
                    value={formData.fieldOfStudy?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fieldOfStudy: e.target.value.split(",").map((field) => field.trim()),
                      })
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Date limite *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applicationLink">Lien de candidature *</Label>
                    <Input
                      id="applicationLink"
                      type="url"
                      required
                      placeholder="https://..."
                      value={formData.applicationLink}
                      onChange={(e) =>
                        setFormData({ ...formData, applicationLink: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility">Éligibilité *</Label>
                  <Textarea
                    id="eligibility"
                    required
                    rows={2}
                    placeholder="Étudiants internationaux, citoyens africains, etc."
                    value={formData.eligibility}
                    onChange={(e) =>
                      setFormData({ ...formData, eligibility: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    Exigences (une par ligne, séparées par des retours à la ligne)
                  </Label>
                  <Textarea
                    id="requirements"
                    rows={4}
                    placeholder="Avoir moins de 30 ans&#10;Excellent dossier académique&#10;Lettre de motivation"
                    value={formData.requirements?.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requirements: e.target.value
                          .split("\n")
                          .map((req) => req.trim())
                          .filter((req) => req),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image *</Label>
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
                    placeholder="france, master, excellence"
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
                  <Label htmlFor="published">Publier la bourse</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingScholarship ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Rechercher une bourse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-80"
        />
        <Select value={filterCountry} onValueChange={setFilterCountry}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les pays</SelectItem>
            {uniqueCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tableau */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des bourses ({filteredScholarships.length})</CardTitle>
          <CardDescription>Gérez toutes les opportunités de bourses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Pays</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date limite</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScholarships.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucune bourse trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredScholarships.map((scholarship) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium max-w-xs">
                      {scholarship.title}
                    </TableCell>
                    <TableCell>{scholarship.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{scholarship.level}</Badge>
                    </TableCell>
                    <TableCell>{scholarship.amount}</TableCell>
                    <TableCell>
                      {new Date(scholarship.deadline).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      {scholarship.published ? (
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
                          onClick={() => handleEdit(scholarship)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(scholarship.id)}
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
