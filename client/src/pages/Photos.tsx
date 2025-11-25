import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// For folder-based groups we now support direct `sub_photos` arrays inside `PHOTOS`.
// Example: sub_photos: ['/images/photos/mediteraneo1.jpg', '/images/photos/mediteraneo2.jpg']

const PHOTOS = [
  {
    id: 1,
    title: "Photo de groupe",
    description: "2018",
    category: "Portraits",
    image: "/images/photos/photo1.png",
  },
  {
    id: 2,
    title: "Concert mediteranéo",
    description: "Concert au Mediteranéo Festival",
    category: "Concert mediteranéo",
    sub_photos: [
      "/images/photos/mediteraneo/mediteraneo1.png",
      "/images/photos/mediteraneo/mediteraneo2.svg",
      "/images/photos/mediteraneo/mediteraneo3.png",
      "/images/photos/mediteraneo/mediteraneo4.png",
      "/images/photos/mediteraneo/mediteraneo5.png",
      "/images/photos/mediteraneo/mediteraneo6.png",
      "/images/photos/mediteraneo/mediteraneo7.png",
      "/images/photos/mediteraneo/mediteraneo8.png",
      "/images/photos/mediteraneo/mediteraneo9.png",
      "/images/photos/mediteraneo/mediteraneo10.png",
    ],
    image: "/images/photos/mediteraneo/mediteraneo1.png",
  },
  {
    id: 3,
    title: "Festival d'été",
    description: "Performance au festival d'été",
    category: "Festivals",
    image: "/images/photos/festival-ete.svg",
  },
  {
    id: 4,
    title: "Portrait du groupe",
    description: "Photo officielle du groupe",
    category: "Portraits",
    image: "/images/photos/portrait-groupe.svg",
  },
  

  {
    id: 5,
    title: "Coulisses",
    description: "Moments en coulisses avant le concert",
    category: "Coulisses",
    image: "/images/photos/coulisses.svg",
  },
];

const CATEGORIES = ["Tous", "Concert mediteranéo", "Studio", "Festivals", "Portraits", "Coulisses"];

export default function Photos() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  // Lightbox control: open flag and current index in the lightbox array
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<typeof PHOTOS>([]);

  const filteredPhotos =
    selectedCategory === "Tous"
      ? PHOTOS
      : PHOTOS.filter((photo) => photo.category === selectedCategory);

  // Show one representative photo per category on the page
  const categoriesToShow =
    selectedCategory === "Tous"
      ? CATEGORIES.filter((c) => PHOTOS.some((p) => p.category === c))
      : [selectedCategory];

  const representativePhotos = categoriesToShow
    .map((cat) => PHOTOS.find((p) => p.category === cat))
    .filter(Boolean) as typeof PHOTOS;

  // Navigation helpers
  const goPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((i) => {
      if (i === null) return null;
      return i > 0 ? i - 1 : Math.max(lightboxPhotos.length - 1, 0);
    });
  };

  const goNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((i) => {
      if (i === null) return null;
      return i < lightboxPhotos.length - 1 ? i + 1 : 0;
    });
  };

  // keyboard navigation when modal open
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Escape") {
        setOpen(false);
        setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, currentIndex, lightboxPhotos.length]);

  // Close modal if lightboxPhotos changes and currentIndex is out of range
  useEffect(() => {
    if (open && currentIndex !== null && currentIndex >= lightboxPhotos.length) {
      setOpen(false);
      setCurrentIndex(null);
    }
  }, [lightboxPhotos, open, currentIndex]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">Galerie Photos</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Découvrez les moments captivants de nos concerts, répétitions et événements spéciaux
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/50"
                    : "bg-slate-800/50 text-slate-400 border border-amber-900/30 hover:border-amber-600/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {representativePhotos.map((photo, idx) => (
              <div
                key={photo.id}
                role="button"
                tabIndex={0}
                aria-label={`Ouvrir la photo ${photo.title}`}
                onClick={() => {
                  // Show all photos in the same folder if available, otherwise use category
                  if (photo.sub_photos && photo.sub_photos.length > 0) {
                    const group = photo.sub_photos.map((url: string, i: number) => ({
                      id: i + 1,
                      title: `${photo.title} ${i + 1}`,
                      description: photo.description,
                      category: photo.category,
                      image: url,
                      sub_photos: photo.sub_photos,
                    }));
                    setLightboxPhotos(group);
                    // try to detect index by filename if representative matches one of the files
                    const clickedFile = photo.image?.split('/').pop();
                    const indexInGroup = group.findIndex((p) => p.image.includes(clickedFile || ''));
                    setCurrentIndex(indexInGroup !== -1 ? indexInGroup : 0);
                    setOpen(true);
                    return;
                  }
                  // fallback to category grouping
                  const group = PHOTOS.filter((p) => p.category === photo.category);
                  setLightboxPhotos(group);
                  const indexInGroup = group.findIndex((p) => p.id === photo.id);
                  setCurrentIndex(indexInGroup !== -1 ? indexInGroup : 0);
                  setOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                    if (photo.sub_photos && photo.sub_photos.length > 0) {
                      const group = photo.sub_photos.map((url: string, i: number) => ({
                        id: i + 1,
                        title: `${photo.title} ${i + 1}`,
                        description: photo.description,
                        category: photo.category,
                        image: url,
                        sub_photos: photo.sub_photos,
                      }));
                      setLightboxPhotos(group);
                      const clickedFile = photo.image?.split('/').pop();
                      const indexInGroup = group.findIndex((p) => p.image.includes(clickedFile || ''));
                      setCurrentIndex(indexInGroup !== -1 ? indexInGroup : 0);
                      setOpen(true);
                      return;
                    }
                    const group = PHOTOS.filter((p) => p.category === photo.category);
                    setLightboxPhotos(group);
                    const indexInGroup = group.findIndex((p) => p.id === photo.id);
                    setCurrentIndex(indexInGroup !== -1 ? indexInGroup : 0);
                    setOpen(true);
                  }
                }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 h-64 flex items-center justify-center group-hover:border-amber-600/50 transition-all group-hover:shadow-lg group-hover:shadow-amber-500/10">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      // hide broken image and keep fallback bg
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 group-hover:from-amber-500/30 group-hover:to-orange-600/30 transition-all"></div>
                  <div className="absolute top-3 left-3 z-10">
                    <div className="w-12 h-12 bg-amber-900/40 rounded-full flex items-center justify-center group-hover:bg-amber-600/60 transition-colors shadow-md">
                      <svg
                        className="w-8 h-8 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>

          {representativePhotos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">Aucune photo dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {open && currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setOpen(false);
            setCurrentIndex(null);
          }}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setOpen(false);
                setCurrentIndex(null);
              }}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev / Next buttons */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
              onClick={goPrev}
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
              onClick={goNext}
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Index indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white text-sm bg-black/30 px-3 py-1 rounded-full">
              {currentIndex !== null ? `${currentIndex + 1} / ${Math.max(lightboxPhotos.length, 1)}` : ""}
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                {lightboxPhotos[currentIndex]?.image ? (
                  <img
                    src={lightboxPhotos[currentIndex]?.image}
                    alt={lightboxPhotos[currentIndex]?.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <svg
                    className="w-24 h-24 text-amber-400/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>

                  <div className="p-8">
                <div className="inline-block px-3 py-1 bg-amber-900/40 border border-amber-600/50 rounded-full mb-4">
                  <span className="text-amber-400 text-sm font-semibold">
                        {lightboxPhotos[currentIndex]?.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                      {lightboxPhotos[currentIndex]?.title}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                      {lightboxPhotos[currentIndex]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
