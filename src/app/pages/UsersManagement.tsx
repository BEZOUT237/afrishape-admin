import { useState } from "react";
import { useData, User } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, Shield, UserCog, Eye } from "lucide-react";

export default function UsersManagement() {
  const { users, setUsers } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "viewer",
    avatar: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      const updated = users.map((u) =>
        u.id === editingUser.id
          ? { ...formData, id: editingUser.id, createdAt: editingUser.createdAt } as User
          : u
      );
      setUsers(updated);
      toast.success("Utilisateur mis à jour avec succès");
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name || "",
        email: formData.email || "",
        role: (formData.role as "admin" | "editor" | "viewer") || "viewer",
        avatar: formData.avatar || "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      toast.success("Utilisateur créé avec succès");
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "viewer",
      avatar: "",
    });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (users.length <= 1) {
      toast.error("Vous ne pouvez pas supprimer le dernier utilisateur");
      return;
    }
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
      toast.success("Utilisateur supprimé avec succès");
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { variant: "default" as const, icon: Shield, label: "Administrateur" },
      editor: { variant: "secondary" as const, icon: UserCog, label: "Éditeur" },
      viewer: { variant: "outline" as const, icon: Eye, label: "Lecteur" },
    };
    const config = variants[role as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant}>
        <Icon className="mr-1 size-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et leurs permissions ({users.length} utilisateur
            {users.length > 1 ? "s" : ""})
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 size-4" />
              Nouvel utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Jean Kouassi"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jean@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value as "admin" | "editor" | "viewer" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="size-4" />
                        Administrateur - Accès complet
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center gap-2">
                        <UserCog className="size-4" />
                        Éditeur - Peut modifier le contenu
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <Eye className="size-4" />
                        Lecteur - Accès en lecture seule
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                  {editingUser ? "Mettre à jour" : "Créer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2">{getRoleBadge(user.role)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Membre depuis le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(user)}
                  className="flex-1"
                >
                  <Edit className="mr-2 size-3" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
                  disabled={users.length <= 1}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Légende des rôles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="font-medium">Administrateur</p>
              <p className="text-sm text-muted-foreground">
                Accès complet au dashboard, peut tout gérer y compris les utilisateurs et les
                paramètres
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserCog className="mt-0.5 size-5 text-secondary-foreground" />
            <div>
              <p className="font-medium">Éditeur</p>
              <p className="text-sm text-muted-foreground">
                Peut créer, modifier et supprimer du contenu mais ne peut pas gérer les
                utilisateurs
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="mt-0.5 size-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Lecteur</p>
              <p className="text-sm text-muted-foreground">
                Accès en lecture seule, peut uniquement consulter le contenu sans le modifier
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
