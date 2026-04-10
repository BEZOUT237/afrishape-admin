import { useState } from "react";
import { useData, Testimonial } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, Star } from "lucide-react";

export default function TestimonialsManagement() {
  const { testimonials, setTestimonials } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    position: "",
    company: "",
    content: "",
    avatar: "",
    rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      const updated = testimonials.map((t) =>
        t.id === editingTestimonial.id ? { ...formData, id: editingTestimonial.id } as Testimonial : t
      );
      setTestimonials(updated);
      toast.success("Témoignage mis à jour avec succès");
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: formData.name || "",
        position: formData.position || "",
        company: formData.company || "",
        content: formData.content || "",
        avatar: formData.avatar || "",
        rating: formData.rating || 5,
      };
      setTestimonials([...testimonials, newTestimonial]);
      toast.success("Témoignage créé avec succès");
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      company: "",
      content: "",
      avatar: "",
      rating: 5,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast.success("Témoignage supprimé avec succès");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestion des témoignages</h2>
          <p className="text-muted-foreground">Gérez les avis et témoignages clients</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Nouveau témoignage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Modifier le témoignage" : "Nouveau témoignage"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Aminata Diallo"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="Ex: CEO"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Ex: TechStart"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Témoignage</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Le contenu du témoignage..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Note (1-5)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseInt(e.target.value) })
                    }
                    className="w-24"
                    required
                  />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-5 ${
                          star <= (formData.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">URL de l'avatar</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  required
                />
                {formData.avatar && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.avatar}
                      alt="Aperçu"
                      className="size-16 rounded-full object-cover"
                    />
                    <p className="text-sm text-muted-foreground">Aperçu de l'avatar</p>
                  </div>
                )}
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
                  {editingTestimonial ? "Mettre à jour" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position} - {testimonial.company}
                    </p>
                    <div className="mt-1 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-3 ${
                            star <= testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm italic">"{testimonial.content}"</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(testimonial)}
                  className="flex-1"
                >
                  <Edit className="mr-2 size-3" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun témoignage. Cliquez sur "Nouveau témoignage" pour commencer.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
