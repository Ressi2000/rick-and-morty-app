"use client";
import React, { useState } from 'react';
import { createEpisode } from '../../service/api-episodes';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

interface CreateEpisodeFormProps {
  onEpisodeCreated: (episode: any) => void;
}

export default function CreateEpisodeForm({ onEpisodeCreated }: CreateEpisodeFormProps) {
  const [name, setName] = useState('');
  const [episode, setEpisode] = useState('');
  const [airDate, setAirDate] = useState('');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !episode || !airDate) {
      setError('Todos los campos son obligatorios');
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newEpisode = await createEpisode({ name, episode, air_date: airDate });
      onEpisodeCreated(newEpisode);
      setName('');
      setEpisode('');
      setAirDate('');
      setError(null);
      toast({
        title: 'Éxito',
        description: 'Episodio creado exitosamente.',
      });
    } catch (err) {
      setError('Error creando el episodio');
      toast({
        title: 'Error',
        description: 'Hubo un error al crear el episodio.',
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
          value={episode}
          onChange={(e) => setEpisode(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="airDate" className="mb-1">Fecha de Emisión</label>
        <input
          id="airDate"
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
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Crear Episodio</button>
      </div>
    </form>
  );
}