import { Music, Play } from "lucide-react";

const ALBUMS = [
  {
    id: 1,
    title: "Psykobazar",
    year: 2024,
    description: "Notre dernier album, une exploration profonde des sonorités balkanique",
    spotifyId: "193700218",
    tracks: 12,
  },
  {
    id: 2,
    title: "Nomade",
    year: 2022,
    description: "Un voyage musical à travers les routes du monde",
    spotifyId: "4cOdK2wGLETKBW3PvgPWqLv",
    tracks: 11,
  },
  {
    id: 3,
    title: "Balkania",
    year: 2020,
    description: "Célébration des traditions musicales des Balkans",
    spotifyId: "4cOdK2wGLETKBW3PvgPWqLv",
    tracks: 13,
  },
  {
    id: 4,
    title: "Tzigane",
    year: 2018,
    description: "Nos racines, notre identité musicale",
    spotifyId: "4cOdK2wGLETKBW3PvgPWqLv",
    tracks: 10,
  },
  {
    id: 5,
    title: "Métissage",
    year: 2016,
    description: "La fusion de l'orient et de l'occident",
    spotifyId: "4cOdK2wGLETKBW3PvgPWqLv",
    tracks: 14,
  },
];

export default function Albums() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">Nos Albums</h1>


 <div className="flex flex-col md:flex-row gap-8 justify-center">
      
      {/* Album 1 */}
      <iframe
        src="https://widget.qobuz.com/album/hzaokq8jtmewa?zone=FR-fr"
        width="378"
        height="390"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>

      {/* Album 2 */}
      <iframe
        src="https://widget.qobuz.com/album/opck8f14p1dlc?zone=FR-fr"
        width="378"
        height="390"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>

    </div>

          </div>
        </div>
      </section>

     

     

      {/* Streaming Platforms */}
      <section className="py-20 border-t border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Écoutez partout
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Spotify", url: "https://open.spotify.com/intl-fr/artist/2SPbNNbig2y44dm8wCQeE2?si=crtaJdC1Siynqr57-cUFAQ", icon: "♪" },
              { name: "Apple Music", url: "https://music.apple.com/artist/vrack", icon: "🎵" },
              { name: "YouTube Music", url: "https://music.youtube.com/channel/vrack", icon: "▶" },
              { name: "SoundCloud", url: "https://soundcloud.com/vrack", icon: "☁" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-lg p-6 hover:border-amber-600/50 transition-all hover:shadow-lg hover:shadow-amber-500/10 text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {platform.icon}
                </div>
                <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                  {platform.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
