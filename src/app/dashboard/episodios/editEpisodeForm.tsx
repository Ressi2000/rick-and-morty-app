import React, { useState, useEffect } from 'react';
import { updateEpisode } from '../../service/api-episodes';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { Episode } from '@/types/episodes';

interface EditEpisodeFormProps {
  episode: Episode;
  onEpisodeUpdated: (updatedEpisode: Episode) => void;
}

export default function EditEpisodeForm({ episode, onEpisodeUpdated }: EditEpisodeFormProps) {
  const [name, setName] = useState(episode.name || '');
  const [episodeCode, setEpisodeCode] = useState(episode.episode || '');
  const [airDate, setAirDate] = useState(episode.air_date || '');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(episode.name || '');
    setEpisodeCode(episode.episode || '');
    setAirDate(episode.air_date || '');
  }, [episode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !episodeCode || !airDate) {
      setError('Todos los campos son obligatorios');
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const updatedEpisode: Episode = { ...episode, name, episode: episodeCode, air_date: airDate };
      await updateEpisode(updatedEpisode); // Actualiza el episodio
      onEpisodeUpdated(updatedEpisode); // Llama a la función con el episodio actualizado
      setError(null);
      toast({
        title: 'Éxito',
        description: 'Episodio actualizado exitosamente.',
      });
    } catch (err) {
      setError('Error actualizando el episodio');
      toast({
        title: 'Error',
        description: 'Hubo un error al actualizar el episodio.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col mb-2">
        <label htmlFor="name" className="mb-1 text-left text-white">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="episode" className="mb-1">Código del Episodio</label>
        <input
          id="episode"
          type="text"
          value={episodeCode}
          onChange={(e) => setEpisodeCode(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="air_date" className="mb-1">Fecha de Emisión</label>
        <input
          id="air_date"
          type="text"
          value={airDate}
          onChange={(e) => setAirDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      {error && <p className="text-white bg-red-700 p-2 mb-2">{error}</p>}
      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/dashboard/episodios"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver
        </Link>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Actualizar Episodio</button>
      </div>
    </form>
  );
}
