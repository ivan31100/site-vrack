import { Users, Music, Globe } from "lucide-react";

const MEMBERS = [
  {
    name: "Membre 1",
    role: "Voix",
    bio: "Chanteur principal avec une voix captivante",
  },
  {
    name: "Membre 2",
    role: "Guitare",
    bio: "Guitariste virtuose spécialisé dans les styles balkanique",
  },
  {
    name: "Membre 3",
    role: "Violon",
    bio: "Violoniste talentueux apportant la mélodie traditionnelle",
  },
  {
    name: "Membre 4",
    role: "Percussion",
    bio: "Percussionniste énergique créant le rythme du groupe",
  },
  {
    name: "Membre 5",
    role: "Basse",
    bio: "Bassiste groovy formant la fondation musicale",
  },
  {
    name: "Membre 6",
    role: "Clavier",
    bio: "Claviériste créatif fusionnant tradition et modernité",
  },
];

export default function Bio() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Qui sommes-nous ?
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              VRACK est un collectif musical unique dédié à la création et à la performance de musique tzigane artisanale. Depuis plus de 15 ans, nous fusionnons les traditions balkanique et tzigane avec une énergie contemporaine pour créer une expérience musicale inoubliable.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              {
                icon: Globe,
                title: "Notre Mission",
                description:
                  "Préserver et célébrer la richesse musicale des traditions balkanique et tzigane tout en les adaptant à un public contemporain.",
              },
              {
                icon: Music,
                title: "Notre Musique",
                description:
                  "Un mélange authentique d'instruments traditionnels et d'arrangements modernes créant une atmosphère festive et envoûtante.",
              },
              {
                icon: Users,
                title: "Notre Communauté",
                description:
                  "Une bande de musiciens passionnés partageant une vision commune : créer de la musique qui unit et inspire.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <item.icon className="w-12 h-12 text-amber-400" />
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                VRACK a été fondé par un groupe de musiciens passionnés par la musique balkanique et tzigane. Ce qui a commencé comme une expérimentation musicale locale s'est transformé en un mouvement qui a captivé des audiences à travers l'Europe.
              </p>
              <p>
                Notre approche unique consiste à respecter les traditions tout en les réinventant pour un public moderne. Chaque concert est une célébration de la diversité musicale et une invitation à voyager à travers les cultures.
              </p>
              <p>
                Avec plus de 100 concerts à notre actif et 5 albums enregistrés, VRACK continue d'évoluer et d'explorer de nouveaux horizons musicaux. Nous restons fidèles à notre vision : créer de la musique qui unit, inspire et fait danser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Les Musiciens</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Découvrez les talents qui font vivre la musique de VRACK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl overflow-hidden hover:border-amber-600/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="h-48 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-orange-600/30 transition-all">
                  <Music className="w-16 h-16 text-amber-400/50 group-hover:text-amber-400/80 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-amber-400 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black/40 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Authenticité",
                description:
                  "Nous préservons l'essence des traditions musicales tout en les adaptant à notre époque.",
              },
              {
                title: "Passion",
                description:
                  "Chaque note, chaque rythme est joué avec le cœur et une énergie contagieuse.",
              },
              {
                title: "Inclusivité",
                description:
                  "Notre musique unit les cultures et crée un espace accueillant pour tous.",
              },
              {
                title: "Innovation",
                description:
                  "Nous explorons constamment de nouvelles sonorités et arrangements tout en restant fidèles à nos racines.",
              },
            ].map((value, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl font-bold text-amber-400">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
