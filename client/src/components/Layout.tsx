import { Link } from "wouter";
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Bio", href: "/bio" },
  { label: "Concerts", href: "/concerts" },
  { label: "Photos", href: "/photos" },
  { label: "Vidéos", href: "/videos" },
  { label: "Albums", href: "/albums" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/vrackmusic", icon: "f" },
  { name: "SoundCloud", url: "https://soundcloud.com/vrack", icon: "☁" },
  { name: "YouTube", url: "https://www.youtube.com/@vrackmusic", icon: "▶" },
  { name: "Spotify", url: "https://open.spotify.com/artist/vrack", icon: "♪" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-all">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                VRACK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-amber-900/20 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-amber-900/20 rounded-md transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 border-t border-amber-900/30 pt-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-amber-900/20 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-amber-900/30 mt-16">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-4">VRACK</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Musique nomade, métissée et festive entre orient et occident. Découvrez notre univers tzigane artisanal.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-4">Navigation</h3>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-4">Suivez-nous</h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-amber-900/30 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:shadow-amber-500/50"
                    title={social.name}
                  >
                    <span className="text-amber-400 font-bold">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-amber-900/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
              <p>&copy; 2025 VRACK. Tous droits réservés.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Mentions légales
                </a>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Politique de confidentialité
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
