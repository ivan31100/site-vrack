import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const VIDEOS = [
  {
    id: 1,
    title: "Concert à centerestival",
    description: "Montage extrait concert centrestival",
    youtubeId: "EbF3pTf5dEI",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Psykobazar - Clip Officiel",
    description: "Clip officiel de notre album Psykobazar",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-09-20",
  },
  {
    id: 3,
    title: "Backstage - Coulisses",
    description: "Découvrez les coulisses de nos concerts",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-08-10",
  },
  {
    id: 4,
    title: "Interview - Rencontre avec le groupe",
    description: "Interview exclusive avec les membres du groupe",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-07-05",
  },
  {
    id: 5,
    title: "Live Session - Acoustique",
    description: "Session acoustique intime en studio",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-06-12",
  },
  {
    id: 6,
    title: "Documentaire - Notre histoire",
    description: "Documentaire sur l'histoire et l'évolution de VRACK",
    youtubeId: "dQw4w9WgXcQ",
    date: "2025-05-30",
  },
];

export default function Videos() {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[number] | null>(null);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">Nos Vidéos</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Regardez nos concerts, clips et contenus exclusifs en ligne
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                role="button"
                tabIndex={0}
                aria-label={`Lire la vidéo ${video.title}`}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedVideo(video);
                  setOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                    setSelectedVideo(video);
                    setOpen(true);
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 aspect-video flex items-center justify-center group-hover:border-amber-600/50 transition-all group-hover:shadow-lg group-hover:shadow-amber-500/10"
                >
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  {/* Fallback Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 group-hover:from-amber-500/30 group-hover:to-orange-600/30 transition-all"></div>

                  {/* Play Button */}
                  <div className="relative z-10 w-16 h-16 bg-amber-500/80 group-hover:bg-amber-600 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {video.description}
                  </p>
                  <p className="text-amber-400/70 text-xs mt-2">
                    {formatDate(video.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Player Dialog */}
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSelectedVideo(null);
      }}>
        <DialogContent className="bg-slate-800 border-amber-900/30 max-w-5xl sm:max-w-6xl">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded overflow-hidden">
            {selectedVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <DialogFooter>
            <div className="flex w-full justify-end">
              <Button variant="outline" onClick={() => setOpen(false)} className="mt-4">
                Fermer
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Featured Video Section */}
      <section className="py-20 bg-black/40 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Vidéo en vedette
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-900/30 shadow-2xl shadow-amber-500/20">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="VRACK - Vidéo en vedette"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Concert à Paris - Complet
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Revivez notre concert complet enregistré à Paris. Une performance énergique
                avec tous les hits de VRACK. Laissez-vous porter par la musique tzigane et
                balkanique dans une ambiance festive et envoûtante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Abonnez-vous à notre chaîne YouTube
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Ne manquez aucune vidéo. Abonnez-vous pour recevoir les derniers contenus
          </p>
          <a
            href="https://www.youtube.com/@vrackmusic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-amber-500/50"
          >
            Visiter notre chaîne YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
