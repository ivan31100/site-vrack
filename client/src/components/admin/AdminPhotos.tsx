import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Image } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Photo {
  id: number;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  imageKey: string;
  thumbnailUrl?: string;
}

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "concert",
    imageUrl: "",
    imageKey: "",
    thumbnailUrl: "",
  });

  const photosQuery = trpc.photos.list.useQuery();
  const createMutation = trpc.photos.create.useMutation();
  const deleteMutation = trpc.photos.delete.useMutation();

  useEffect(() => {
    if (photosQuery.data) {
      setPhotos(photosQuery.data as Photo[]);
    }
  }, [photosQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        category: formData.category,
        imageUrl: formData.imageUrl,
        imageKey: formData.imageKey,
        thumbnailUrl: formData.thumbnailUrl || undefined,
      });
      toast.success("Photo ajoutée avec succès");
      setFormData({
        title: "",
        description: "",
        category: "concert",
        imageUrl: "",
        imageKey: "",
        thumbnailUrl: "",
      });
      setIsOpen(false);
      photosQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la photo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Photo supprimée");
      photosQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const categories = ["concert", "studio", "festival", "coulisses", "autre"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Photos</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-amber-900/30">
            <DialogHeader>
              <DialogTitle className="text-white">Ajouter une Photo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Titre *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Titre de la photo"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Catégorie *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300">URL Image *</label>
                <Input
                  required
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Clé Image (S3) *</label>
                <Input
                  required
                  value={formData.imageKey}
                  onChange={(e) => setFormData({ ...formData, imageKey: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="photos/concert-2024"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL Thumbnail</label>
                <Input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Ajouter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.length === 0 ? (
          <Card className="bg-slate-800/50 border-amber-900/30 col-span-full">
            <CardContent className="pt-6 text-center text-slate-400">
              Aucune photo pour le moment
            </CardContent>
          </Card>
        ) : (
          photos.map((photo) => (
            <Card key={photo.id} className="bg-slate-800/50 border-amber-900/30 overflow-hidden hover:border-amber-600/50 transition-colors">
              <div className="aspect-square bg-slate-700 flex items-center justify-center overflow-hidden">
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-white text-sm line-clamp-2">{photo.title}</CardTitle>
                    <p className="text-xs text-amber-400 mt-1">{photo.category}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-600/50 h-8 w-8 p-0"
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {photo.description && (
                <CardContent className="text-xs text-slate-400 line-clamp-2">
                  {photo.description}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
