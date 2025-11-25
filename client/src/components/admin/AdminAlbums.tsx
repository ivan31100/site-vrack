import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Music } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Album {
  id: number;
  title: string;
  description?: string;
  releaseYear: number;
  spotifyId?: string;
  spotifyUrl?: string;
  coverImageUrl?: string;
  coverImageKey?: string;
  trackCount?: number;
}

export default function AdminAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: new Date().getFullYear(),
    spotifyId: "",
    spotifyUrl: "",
    coverImageUrl: "",
    coverImageKey: "",
    trackCount: "",
  });

  const albumsQuery = trpc.albums.list.useQuery();
  const createMutation = trpc.albums.create.useMutation();
  const deleteMutation = trpc.albums.delete.useMutation();

  useEffect(() => {
    if (albumsQuery.data) {
      setAlbums(albumsQuery.data as Album[]);
    }
  }, [albumsQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        releaseYear: formData.releaseYear,
        spotifyId: formData.spotifyId || undefined,
        spotifyUrl: formData.spotifyUrl || undefined,
        coverImageUrl: formData.coverImageUrl || undefined,
        coverImageKey: formData.coverImageKey || undefined,
        trackCount: formData.trackCount ? parseInt(formData.trackCount) : undefined,
      });
      toast.success("Album créé avec succès");
      setFormData({
        title: "",
        description: "",
        releaseYear: new Date().getFullYear(),
        spotifyId: "",
        spotifyUrl: "",
        coverImageUrl: "",
        coverImageKey: "",
        trackCount: "",
      });
      setIsOpen(false);
      albumsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la création de l'album");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Album supprimé");
      albumsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Albums</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Album
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-amber-900/30 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Ajouter un Album</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Titre *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Titre de l'album"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Description de l'album"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Année de sortie *</label>
                <Input
                  required
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">ID Spotify</label>
                <Input
                  value={formData.spotifyId}
                  onChange={(e) => setFormData({ ...formData, spotifyId: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Spotify ID"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL Spotify</label>
                <Input
                  type="url"
                  value={formData.spotifyUrl}
                  onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://open.spotify.com/album/..."
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL Couverture</label>
                <Input
                  type="url"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Clé Couverture (S3)</label>
                <Input
                  value={formData.coverImageKey}
                  onChange={(e) => setFormData({ ...formData, coverImageKey: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="albums/cover-2024"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Nombre de Pistes</label>
                <Input
                  type="number"
                  value={formData.trackCount}
                  onChange={(e) => setFormData({ ...formData, trackCount: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
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
        {albums.length === 0 ? (
          <Card className="bg-slate-800/50 border-amber-900/30">
            <CardContent className="pt-6 text-center text-slate-400">
              Aucun album pour le moment
            </CardContent>
          </Card>
        ) : (
          albums.map((album) => (
            <Card key={album.id} className="bg-slate-800/50 border-amber-900/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-1">
                    {album.coverImageUrl && (
                      <img
                        src={album.coverImageUrl}
                        alt={album.title}
                        className="w-24 h-24 rounded object-cover"
                      />
                    )}
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Music className="w-5 h-5 text-amber-400" />
                        {album.title}
                      </CardTitle>
                      <p className="text-sm text-slate-400 mt-1">{album.releaseYear}</p>
                      {album.trackCount && (
                        <p className="text-sm text-slate-400">{album.trackCount} pistes</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-amber-400 border-amber-600/50">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-400 border-red-600/50"
                      onClick={() => handleDelete(album.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {album.description && (
                <CardContent className="text-slate-300">
                  {album.description}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
