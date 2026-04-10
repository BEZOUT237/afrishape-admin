import { useState } from "react";
import { useData, Service } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save } from "lucide-react";

export default function ServicesManagement() {
  const { services, setServices } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    icon: "Briefcase",
    features: [],
  });
  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Mise à jour
      const updated = services.map((s) =>
        s.id === editingService.id ? { ...formData, id: editingService.id } as Service : s
      );
      setServices(updated);
      toast.success("Service mis à jour avec succès");
    } else {
      // Création
      const newService: Service = {
        id: Date.now().toString(),
        title: formData.title || "",
        description: formData.description || "",
        icon: formData.icon || "Briefcase",
        features: formData.features || [],
      };
      setServices([...services, newService]);
      toast.success("Service créé avec succès");
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "Briefcase",
      features: [],
    });
    setEditingService(null);
    setNewFeature("");
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      setServices(services.filter((s) => s.id !== id));
      toast.success("Service supprimé avec succès");
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestion des services</h2>
          <p className="text-muted-foreground">Gérez les services proposés par AfriShape</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Nouveau service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Modifier le service" : "Nouveau service"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du service</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Développement Web"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description du service"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icône (nom Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Ex: Globe, Smartphone, Briefcase"
                />
                <p className="text-xs text-muted-foreground">
                  Voir: lucide.dev/icons
                </p>
              </div>

              <div className="space-y-2">
                <Label>Fonctionnalités</Label>
                <div className="space-y-2">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={feature} readOnly className="flex-1" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Nouvelle fonctionnalité"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <Button type="button" onClick={addFeature}>
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setDialogOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="mr-2 size-4" />
                  {editingService ? "Mettre à jour" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Fonctionnalités</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {service.description}
                    </TableCell>
                    <TableCell>{service.features.length} fonctionnalité(s)</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Aucun service. Cliquez sur "Nouveau service" pour commencer.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
