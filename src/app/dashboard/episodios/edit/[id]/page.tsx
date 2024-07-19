"use client";
import Sidebar from '@/components/sidebar';
import React, { useEffect, useState } from 'react';
import EditEpisodeForm from '../../editEpisodeForm'; // Importa el formulario de edición de episodios
import Image from 'next/image';
import { Episode } from '@/types/episodes'; // Asegúrate de importar el tipo Episode
import { useParams, useRouter } from 'next/navigation';
import { updateEpisode, fetchEpisodeById } from '@/app/service/api-episodes'; // Usa las funciones para episodios

const EditEpisodePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        if (id) {
          const fetchedEpisode = await fetchEpisodeById(Number(id));
          setEpisode(fetchedEpisode);
        }
      } catch (error) {
        console.error("Error fetching episode:", error);
        router.push('/'); // Redirecciona si hay un error
      }
    };

    fetchEpisode();
  }, [id, router]);

  const handleEpisodeUpdated = async (updatedEpisode: Episode) => {
    try {
      await updateEpisode(updatedEpisode);
      router.push('/dashboard/episodios'); // Redirecciona a la lista de episodios
    } catch (error) {
      console.error("Error updating episode:", error);
    }
  };

  if (!episode) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4 bg-slate-800 bg-opacity-40 backdrop-blur-md">
          <div className="flex flex-col w-full h-full px-3 py-4 md:px-2 bg-gray-800 bg-opacity-50 text-white border border-y-rose-50">
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="glassmorphism p-8 w-[500px] mx-auto text-center mb-6">
                <Image
                  src="/customers/ram-logo.png"
                  alt="Rick and Morty Logo"
                  width={450}
                  height={150}
                  className="object-contain mb-4"
                />
                <EditEpisodeForm episode={episode} onEpisodeUpdated={handleEpisodeUpdated} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditEpisodePage;