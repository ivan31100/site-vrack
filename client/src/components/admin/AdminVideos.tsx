import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Video } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface VideoItem {
  id: number;
  title: string;
  description?: string;
  youtubeId: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeId: "",
    youtubeUrl: "",
    thumbnailUrl: "",
  });

  const videosQuery = trpc.videos.list.useQuery();
  const createMutation = trpc.videos.create.useMutation();
  const deleteMutation = trpc.videos.delete.useMutation();

  useEffect(() => {
    if (videosQuery.data) {
      setVideos(videosQuery.data as VideoItem[]);
    }
  }, [videosQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        youtubeId: formData.youtubeId,
        youtubeUrl: formData.youtubeUrl || undefined,
        thumbnailUrl: formData.thumbnailUrl || undefined,
      });
      toast.success("Vidéo ajoutée avec succès");
      setFormData({
        title: "",
        description: "",
        youtubeId: "",
        youtubeUrl: "",
        thumbnailUrl: "",
      });
      setIsOpen(false);
      videosQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la vidéo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Vidéo supprimée");
      videosQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const extractYoutubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Vidéos</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Vidéo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-amber-900/30">
            <DialogHeader>
              <DialogTitle className="text-white">Ajouter une Vidéo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Titre *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Titre de la vidéo"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Description de la vidéo"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">ID YouTube *</label>
                <Input
                  required
                  value={formData.youtubeId}
                  onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="dQw4w9WgXcQ"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">URL YouTube</label>
                <Input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    setFormData({
                      ...formData,
                      youtubeUrl: url,
                      youtubeId: extractYoutubeId(url) || formData.youtubeId,
                    });
                  }}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.length === 0 ? (
          <Card className="bg-slate-800/50 border-amber-900/30 col-span-full">
            <CardContent className="pt-6 text-center text-slate-400">
              Aucune vidéo pour le moment
            </CardContent>
          </Card>
        ) : (
          videos.map((video) => (
            <Card key={video.id} className="bg-slate-800/50 border-amber-900/30 overflow-hidden hover:border-amber-600/50 transition-colors">
              <div className="aspect-video bg-slate-700 flex items-center justify-center relative">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors">
                  <Video className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-white text-sm line-clamp-2">{video.title}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 border-red-600/50 h-8 w-8 p-0"
                    onClick={() => handleDelete(video.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {video.description && (
                <CardContent className="text-xs text-slate-400 line-clamp-2">
                  {video.description}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
