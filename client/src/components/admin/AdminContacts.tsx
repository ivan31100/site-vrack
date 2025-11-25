import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Trash2, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const contactsQuery = trpc.contact.list.useQuery();

  useEffect(() => {
    if (contactsQuery.data) {
      setContacts(contactsQuery.data as Contact[]);
    }
  }, [contactsQuery.data]);

  const handleDelete = async (id: number) => {
    try {
      setContacts(contacts.filter((c) => c.id !== id));
      toast.success("Message supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Messages de Contact</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-amber-400 mt-1">{unreadCount} message(s) non lu(s)</p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card className="bg-slate-800/50 border-amber-900/30">
            <CardContent className="pt-6 text-center text-slate-400">
              Aucun message pour le moment
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card
              key={contact.id}
              className={`border-l-4 transition-all cursor-pointer ${
                contact.read
                  ? "bg-slate-800/30 border-amber-900/30"
                  : "bg-slate-800/50 border-l-amber-400 border-amber-900/30 hover:border-amber-600/50"
              }`}
              onClick={() => setSelectedId(selectedId === contact.id ? null : contact.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className={`w-5 h-5 ${contact.read ? "text-slate-500" : "text-amber-400"}`} />
                      <CardTitle className={`text-base ${contact.read ? "text-slate-400" : "text-white font-bold"}`}>
                        {contact.subject}
                      </CardTitle>
                      {!contact.read && (
                        <span className="ml-auto px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                      De: <strong>{contact.name}</strong> ({contact.email})
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(contact.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-600/50 h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(contact.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {selectedId === contact.id && (
                <CardContent className="border-t border-amber-900/30 pt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Message:</h4>
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Message marqué comme lu");
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Marquer comme lu
                    </Button>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Répondre
                    </a>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
