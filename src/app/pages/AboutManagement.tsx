import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Save, Plus, X } from "lucide-react";

export default function AboutManagement() {
  const { about, setAbout } = useData();
  const [formData, setFormData] = useState(about);
  const [newValue, setNewValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAbout(formData);
    toast.success("Section À propos mise à jour avec succès");
  };

  const addValue = () => {
    if (newValue.trim()) {
      setFormData({
        ...formData,
        values: [...formData.values, newValue.trim()],
      });
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Modifier la section À propos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Titre de la section"
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
                placeholder="Description générale"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission">Mission</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                placeholder="Notre mission"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="Notre vision"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Valeurs</Label>
              <div className="space-y-2">
                {formData.values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={value} readOnly className="flex-1" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeValue(index)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Nouvelle valeur"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addValue();
                      }
                    }}
                  />
                  <Button type="button" onClick={addValue}>
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamImage">URL de l'image d'équipe</Label>
              <Input
                id="teamImage"
                value={formData.teamImage}
                onChange={(e) =>
                  setFormData({ ...formData, teamImage: e.target.value })
                }
                placeholder="https://example.com/team.jpg"
              />
              {formData.teamImage && (
                <div className="mt-2 overflow-hidden rounded-lg border">
                  <img
                    src={formData.teamImage}
                    alt="Aperçu"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(about)}
              >
                Annuler
              </Button>
              <Button type="submit">
                <Save className="mr-2 size-4" />
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
