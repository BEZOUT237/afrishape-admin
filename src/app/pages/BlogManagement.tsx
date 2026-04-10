import { useState } from "react";
import { useData, BlogPost } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, Eye, EyeOff } from "lucide-react";

export default function BlogManagement() {
  const { blogPosts, setBlogPosts } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    image: "",
    published: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      const updated = blogPosts.map((p) =>
        p.id === editingPost.id ? { ...formData, id: editingPost.id } as BlogPost : p
      );
      setBlogPosts(updated);
      toast.success("Article mis à jour avec succès");
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formData.title || "",
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        author: formData.author || "",
        date: formData.date || new Date().toISOString().split("T")[0],
        category: formData.category || "",
        image: formData.image || "",
        published: formData.published || false,
      };
      setBlogPosts([...blogPosts, newPost]);
      toast.success("Article créé avec succès");
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      image: "",
      published: false,
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      setBlogPosts(blogPosts.filter((p) => p.id !== id));
      toast.success("Article supprimé avec succès");
    }
  };

  const togglePublished = (id: string) => {
    const updated = blogPosts.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    setBlogPosts(updated);
    const post = blogPosts.find((p) => p.id === id);
    toast.success(
      post?.published ? "Article dépublié" : "Article publié"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestion du blog</h2>
          <p className="text-muted-foreground">Gérez les articles de blog AfriShape</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Nouvel article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Modifier l'article" : "Nouvel article"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l'article</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: L'avenir du digital en Afrique"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Résumé</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Bref résumé de l'article"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Contenu complet de l'article"
                  rows={8}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author">Auteur</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nom de l'auteur"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Ex: Technologie"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date de publication</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de l'image</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.image && (
                  <div className="mt-2 overflow-hidden rounded-lg border">
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <Label htmlFor="published">Publier l'article</Label>
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
                  {editingPost ? "Mettre à jour" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="size-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant={post.published ? "default" : "outline"}>
                      {post.published ? (
                        <>
                          <Eye className="mr-1 size-3" />
                          Publié
                        </>
                      ) : (
                        <>
                          <EyeOff className="mr-1 size-3" />
                          Brouillon
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-2 text-sm">{post.excerpt}</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium">Par:</span> {post.author}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(post.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublished(post.id)}
                  className="flex-1"
                >
                  {post.published ? <EyeOff className="mr-1 size-3" /> : <Eye className="mr-1 size-3" />}
                  {post.published ? "Dépublier" : "Publier"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                  <Edit className="size-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun article. Cliquez sur "Nouvel article" pour commencer.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
