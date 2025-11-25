import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const UPCOMING_CONCERTS = [
  {
    date: "2025-12-15",
    time: "20:00",
    title: "Concert de Noël",
    location: "Salle des fêtes, Paris",
    description: "Un concert festif spécial pour célébrer les fêtes de fin d'année",
    tickets: "https://example.com/tickets",
  },
  {
    date: "2026-01-20",
    time: "19:30",
    title: "Soirée Balkanique",
    location: "Théâtre Municipal, Lyon",
    description: "Une soirée immersive dans l'univers musical des Balkans",
    tickets: "https://example.com/tickets",
  },
  {
    date: "2026-02-14",
    time: "21:00",
    title: "Saint-Valentin Musical",
    location: "Cabaret du Marais, Paris",
    description: "Une soirée romantique avec les plus belles mélodies de VRACK",
    tickets: "https://example.com/tickets",
  },
];

const PAST_CONCERTS = [
  {
    date: "2025-11-10",
    title: "Festival d'Automne",
    location: "Bordeaux",
  },
  {
    date: "2025-10-25",
    title: "Nuit des Cultures",
    location: "Marseille",
  },
  {
    date: "2025-09-15",
    title: "Concert Estival",
    location: "Nice",
  },
];

export default function Concerts() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
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
            <h1 className="text-5xl font-bold text-white mb-6">Nos Concerts</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Venez nous découvrir en live ! Consultez notre calendrier de concerts et réservez vos places dès maintenant.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Concerts */}
      <section className="py-20 border-b border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">Prochains Concerts</h2>

          {UPCOMING_CONCERTS.length > 0 ? (
            <div className="space-y-6">
              {UPCOMING_CONCERTS.map((concert, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-8 hover:border-amber-600/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Date */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold">{formatDate(concert.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-5 h-5" />
                        <span>{concert.time}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="md:col-span-2 space-y-3">
                      <h3 className="text-2xl font-bold text-white">{concert.title}</h3>
                      <div className="flex items-start gap-2 text-slate-400">
                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-amber-400" />
                        <div>
                          <p className="font-semibold">{concert.location}</p>
                          <p className="text-sm mt-1">{concert.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-end">
                      <a href={concert.tickets} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          Réserver
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-400 mb-2">Aucun concert programmé</h3>
              <p className="text-slate-500">
                Revenez bientôt pour découvrir nos prochaines dates !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Concerts */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">Concerts Passés</h2>

          <div className="space-y-4">
            {PAST_CONCERTS.map((concert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-amber-600/30 transition-all"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-amber-400/50" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-400 text-sm font-semibold">
                    {formatDate(concert.date)}
                  </p>
                  <h3 className="text-lg font-bold text-white">{concert.title}</h3>
                  <p className="text-slate-400 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {concert.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-y border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ne manquez aucun concert</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les annonces de nos prochains concerts
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-amber-900/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors"
            />
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold">
              S'inscrire
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
