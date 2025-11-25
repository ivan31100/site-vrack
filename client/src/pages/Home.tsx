import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Users, Zap } from "lucide-react";

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-amber-900/40 border border-amber-600/50 rounded-full">
                  <span className="text-amber-400 text-sm font-semibold">Musique Balkanique</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    VRACK
                  </span>
                  <br />
                  <span className="text-slate-100">Tzigane Artisanal</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                  Musique nomade, métissée et festive entre orient et occident. Découvrez notre univers musical unique et envoûtant.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/concerts">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg group">
                    Voir les concerts
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/albums">
                  <Button variant="outline" className="border-amber-600/50 text-amber-400 hover:bg-amber-900/20 px-8 py-6 text-lg font-semibold rounded-lg">
                    Écouter les albums
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-amber-400">15+</div>
                  <p className="text-sm text-slate-400">Années d'expérience</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-amber-400">100+</div>
                  <p className="text-sm text-slate-400">Concerts</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-amber-400">5</div>
                  <p className="text-sm text-slate-400">Albums</p>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Image */}
            <div className="relative h-[500px] hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-amber-600/30">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Music className="w-24 h-24 text-amber-400/50 mx-auto mb-4" />
                    <p className="text-slate-500">Photo du groupe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/40 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Pourquoi VRACK ?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Une expérience musicale authentique qui fusionne les traditions balkanique et tzigane avec une énergie contemporaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                title: "Musique Authentique",
                description: "Instruments traditionnels et arrangements modernes pour une expérience unique",
              },
              {
                icon: Users,
                title: "Énergie Collective",
                description: "Une bande de musiciens passionnés créant une atmosphère festive et envoûtante",
              },
              {
                icon: Zap,
                title: "Spectacles Mémorables",
                description: "Des performances live captivantes qui transportent le public aux quatre coins du monde",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl hover:border-amber-600/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
              >
                <feature.icon className="w-12 h-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Album Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-white mb-4">Notre dernier album</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Découvrez notre dernier album qui capture l'essence de notre musique. Un voyage sonore à travers les Balkans et au-delà.
              </p>
              <Link href="/albums">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg">
                  Voir tous les albums
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Music className="w-20 h-20 text-amber-400/50 mx-auto mb-4" />
                  <p className="text-slate-500">Lecteur Spotify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Prêt à nous découvrir ?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Explorez notre musique, regardez nos vidéos et venez nous voir en concert
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/concerts">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg">
                Concerts
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-amber-600/50 text-amber-400 hover:bg-amber-900/20 px-8 py-6 text-lg font-semibold rounded-lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
