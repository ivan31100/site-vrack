import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Image, Video, Calendar, Mail, LogOut } from "lucide-react";
import AdminConcerts from "@/components/admin/AdminConcerts";
import AdminPhotos from "@/components/admin/AdminPhotos";
import AdminAlbums from "@/components/admin/AdminAlbums";
import AdminVideos from "@/components/admin/AdminVideos";
import AdminContacts from "@/components/admin/AdminContacts";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("concerts");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Accès Refusé</h1>
          <p className="text-slate-400 mb-8">Vous devez être administrateur pour accéder à cette page.</p>
          <Button onClick={() => setLocation("/")} className="bg-amber-600 hover:bg-amber-700">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/40 border-b border-amber-900/30 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">VRACK Admin</h1>
            <p className="text-sm text-slate-400">Bienvenue, {user?.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-amber-600/50 text-amber-400 hover:bg-amber-900/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-amber-900/30 p-1">
            <TabsTrigger value="concerts" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Concerts</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="albums" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Albums</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Vidéos</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concerts" className="mt-8">
            <AdminConcerts />
          </TabsContent>

          <TabsContent value="photos" className="mt-8">
            <AdminPhotos />
          </TabsContent>

          <TabsContent value="albums" className="mt-8">
            <AdminAlbums />
          </TabsContent>

          <TabsContent value="videos" className="mt-8">
            <AdminVideos />
          </TabsContent>

          <TabsContent value="contacts" className="mt-8">
            <AdminContacts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
