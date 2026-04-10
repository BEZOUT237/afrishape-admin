import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function HeroManagement() {
  const { hero, setHero } = useData();
  const [formData, setFormData] = useState(hero);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHero(formData);
    toast.success("Section Hero mise à jour avec succès");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Modifier la section Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre principal</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Titre accrocheur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Sous-titre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée"
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Texte du bouton CTA</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Ex: Découvrir"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaLink">Lien du bouton CTA</Label>
                <Input
                  id="ctaLink"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="Ex: #services"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundImage">URL de l'image de fond</Label>
              <Input
                id="backgroundImage"
                value={formData.backgroundImage}
                onChange={(e) =>
                  setFormData({ ...formData, backgroundImage: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
              {formData.backgroundImage && (
                <div className="mt-2 overflow-hidden rounded-lg border">
                  <img
                    src={formData.backgroundImage}
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
                onClick={() => setFormData(hero)}
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

      <Card>
        <CardHeader>
          <CardTitle>Aperçu</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-lg bg-cover bg-center p-8"
            style={{ backgroundImage: `url(${formData.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 max-w-3xl space-y-4 text-center text-white">
              <p className="text-sm uppercase tracking-wider opacity-90">
                {formData.subtitle}
              </p>
              <h1 className="text-4xl font-bold">{formData.title}</h1>
              <p className="text-lg opacity-90">{formData.description}</p>
              <button className="rounded-lg bg-white px-6 py-3 font-medium text-black transition-transform hover:scale-105">
                {formData.ctaText}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
