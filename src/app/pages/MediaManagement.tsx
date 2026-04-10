import { useState } from "react";
import { useData, Media } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, Download, Copy, Image as ImageIcon } from "lucide-react";

export default function MediaManagement() {
  const { media, setMedia } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMedia: Media = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      type: formData.url.toLowerCase().endsWith(".mp4") ? "video/mp4" : "image/jpeg",
      size: Math.floor(Math.random() * 5000000) + 500000, // Mock size
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    
    setMedia([...media, newMedia]);
    toast.success("Média ajouté avec succès");
    
    setFormData({ name: "", url: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce média ?")) {
      setMedia(media.filter((m) => m.id !== id));
      toast.success("Média supprimé avec succès");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiée dans le presse-papier");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Bibliothèque de médias</h2>
          <p className="text-muted-foreground">
            Gérez les images et vidéos utilisées sur le site ({media.length} média
            {media.length > 1 ? "s" : ""})
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" />
              Ajouter un média
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau média</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du fichier</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: hero-background.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL du média</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.url && (
                  <div className="mt-2 overflow-hidden rounded-lg border">
                    <img
                      src={formData.url}
                      alt="Aperçu"
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "";
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ name: "", url: "" });
                    setDialogOpen(false);
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">Ajouter</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {media.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden bg-muted">
                {item.type.startsWith("image") ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="size-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImageIcon className="size-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardContent className="space-y-3 p-4">
                <div>
                  <p className="truncate text-sm font-medium" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(item.size)} • {item.uploadedAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyUrl(item.url)}
                    className="flex-1"
                  >
                    <Copy className="mr-1 size-3" />
                    Copier URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                  >
                    <a href={item.url} download target="_blank" rel="noopener noreferrer">
                      <Download className="size-3" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="mx-auto size-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              Aucun média. Cliquez sur "Ajouter un média" pour commencer.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
