import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Concert {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  location: string;
  address?: string;
  ticketUrl?: string;
  imageUrl?: string;
}

export default function AdminConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    ticketUrl: "",
    imageUrl: "",
  });

  const concertsQuery = trpc.concerts.list.useQuery();
  const createMutation = trpc.concerts.create.useMutation();
  const deleteMutation = trpc.concerts.delete.useMutation();

  useEffect(() => {
    if (concertsQuery.data) {
      setConcerts(concertsQuery.data as Concert[]);
    }
  }, [concertsQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        date: new Date(formData.date),
        time: formData.time || undefined,
        location: formData.location,
        address: formData.address || undefined,
        ticketUrl: formData.ticketUrl || undefined,
        imageUrl: formData.imageUrl || undefined,
      });
      toast.success("Concert créé avec succès");
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        address: "",
        ticketUrl: "",
        imageUrl: "",
      });
      setIsOpen(false);
      concertsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la création du concert");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Concert supprimé");
      concertsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Concerts</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Concert
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-amber-900/30">
            <DialogHeader>
              <DialogTitle className="text-white">Ajouter un Concert</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Titre *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Titre du concert"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Description du concert"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300">Date *</label>
                  <Input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Heure</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-300">Lieu *</label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Nom du lieu"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Adresse</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Adresse complète"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL des Tickets</label>
                <Input
                  type="url"
                  value={formData.ticketUrl}
                  onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL Image</label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Créer
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {concerts.length === 0 ? (
          <Card className="bg-slate-800/50 border-amber-900/30">
            <CardContent className="pt-6 text-center text-slate-400">
              Aucun concert pour le moment
            </CardContent>
          </Card>
        ) : (
          concerts.map((concert) => (
            <Card key={concert.id} className="bg-slate-800/50 border-amber-900/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      {concert.title}
                    </CardTitle>
                    <p className="text-sm text-slate-400 mt-2">
                      {new Date(concert.date).toLocaleDateString("fr-FR")} {concert.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-amber-400 border-amber-600/50">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-400 border-red-600/50"
                      onClick={() => handleDelete(concert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {concert.description && <p className="text-slate-300">{concert.description}</p>}
                <p className="text-slate-400">
                  <strong>Lieu :</strong> {concert.location}
                </p>
                {concert.address && (
                  <p className="text-slate-400">
                    <strong>Adresse :</strong> {concert.address}
                  </p>
                )}
                {concert.ticketUrl && (
                  <a href={concert.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                    Voir les tickets
                  </a>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
