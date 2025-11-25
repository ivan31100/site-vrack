import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">Nous Contacter</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Vous avez des questions, des propositions ou souhaitez nous réserver pour un
              événement ? Contactez-nous !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-b border-amber-900/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8">Informations de Contact</h2>

              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@vrack.fr",
                  href: "mailto:contact@vrack.fr",
                },
                {
                  icon: Phone,
                  title: "Téléphone",
                  content: "+33 1 23 45 67 89",
                  href: "tel:+33123456789",
                },
                {
                  icon: MapPin,
                  title: "Adresse",
                  content: "Paris, France",
                  href: "#",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group flex gap-4 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl hover:border-amber-600/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 group-hover:text-amber-400 transition-colors">
                      {item.content}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="pt-8 border-t border-amber-900/30">
                <h3 className="text-lg font-bold text-white mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Facebook", url: "https://facebook.com/vrackmusic", icon: "f" },
                    { name: "SoundCloud", url: "https://soundcloud.com/vrack", icon: "☁" },
                    { name: "YouTube", url: "https://youtube.com/@vrackmusic", icon: "▶" },
                    { name: "Instagram", url: "https://instagram.com/vrackmusic", icon: "📷" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-amber-900/30 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:shadow-amber-500/50 text-amber-400 font-bold"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Envoyez-nous un message</h2>

              {submitted ? (
                <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-6 text-center">
                  <p className="text-green-400 font-semibold">
                    Merci ! Votre message a été envoyé avec succès.
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Nous vous répondrons dès que possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-900/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-900/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-900/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-900/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-600/50 transition-colors resize-none"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/40">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Questions Fréquemment Posées
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Comment réserver VRACK pour un événement ?",
                answer:
                  "Contactez-nous par email ou téléphone avec les détails de votre événement. Nous discuterons de la disponibilité et des tarifs.",
              },
              {
                question: "Quels sont vos tarifs de concert ?",
                answer:
                  "Les tarifs varient selon la durée du concert et le type d'événement. Contactez-nous pour un devis personnalisé.",
              },
              {
                question: "Pouvez-vous jouer des musiques sur demande ?",
                answer:
                  "Oui, nous pouvons adapter notre setlist selon vos préférences. Discutez-en lors de la réservation.",
              },
              {
                question: "Quel est votre délai de réponse ?",
                answer:
                  "Nous répondons généralement dans les 24 à 48 heures. Pour les demandes urgentes, appelez-nous directement.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-900/30 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-amber-400 mb-3">{faq.question}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
