import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2, Eye } from "lucide-react";

export default function MessagesManagement() {
  const { messages, setMessages } = useData();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const currentMessage = messages.find((m) => m.id === selectedMessage);

  const markAsRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    toast.success("Message marqué comme lu");
  };

  const markAsUnread = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: false } : m));
    setMessages(updated);
    toast.success("Message marqué comme non lu");
  };

  const deleteMessage = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      setMessages(messages.filter((m) => m.id !== id));
      setSelectedMessage(null);
      toast.success("Message supprimé avec succès");
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Messages de contact</h2>
          <p className="text-muted-foreground">
            Gérez les messages reçus via le formulaire de contact ({unreadCount} non lu
            {unreadCount > 1 ? "s" : ""})
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Boîte de réception</span>
              <Badge variant="secondary">{messages.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {messages.length > 0 ? (
              messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message.id);
                    if (!message.read) {
                      markAsRead(message.id);
                    }
                  }}
                  className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                    selectedMessage === message.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {message.read ? (
                          <MailOpen className="size-4 text-muted-foreground" />
                        ) : (
                          <Mail className="size-4 text-blue-600" />
                        )}
                        <p className="text-sm font-medium">{message.name}</p>
                      </div>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">{message.date}</p>
                    </div>
                    {!message.read && (
                      <div className="size-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Aucun message
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Détails du message</CardTitle>
          </CardHeader>
          <CardContent>
            {currentMessage ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{currentMessage.subject}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        De: <span className="font-medium">{currentMessage.name}</span>
                      </p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">
                        {currentMessage.email}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reçu le {new Date(currentMessage.date).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(currentMessage.date).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge variant={currentMessage.read ? "secondary" : "default"}>
                    {currentMessage.read ? "Lu" : "Non lu"}
                  </Badge>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="whitespace-pre-wrap text-sm">{currentMessage.message}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      currentMessage.read
                        ? markAsUnread(currentMessage.id)
                        : markAsRead(currentMessage.id)
                    }
                  >
                    {currentMessage.read ? (
                      <>
                        <Mail className="mr-2 size-4" />
                        Marquer comme non lu
                      </>
                    ) : (
                      <>
                        <MailOpen className="mr-2 size-4" />
                        Marquer comme lu
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMessage(currentMessage.id)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Supprimer
                  </Button>
                  <Button variant="default" asChild>
                    <a href={`mailto:${currentMessage.email}?subject=Re: ${currentMessage.subject}`}>
                      Répondre par email
                    </a>
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium">Informations de contact</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Nom:</span>{" "}
                      {currentMessage.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <a
                        href={`mailto:${currentMessage.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {currentMessage.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <Mail className="mx-auto size-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Sélectionnez un message pour voir son contenu
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
