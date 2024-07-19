"use client";
import React, { useState } from 'react';
import { createCharacter } from '../../service/api-character';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

interface CreateCharacterFormProps {
  onCharacterCreated: (character: any) => void;
}

export default function CreateCharacterForm({ onCharacterCreated }: CreateCharacterFormProps) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !species || !gender || !status) {
      setError('Todos los campos son obligatorios');
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newCharacter = await createCharacter({ name, species, type, gender, status });
      onCharacterCreated(newCharacter);
      setName('');
      setSpecies('');
      setType('');
      setGender('');
      setStatus('');
      setError(null);
      toast({
        title: 'Éxito',
        description: 'Personaje creado exitosamente.',
      });
    } catch (err) {
      setError('Error creando el personaje');
      toast({
        title: 'Error',
        description: 'Hubo un error al crear el personaje.',
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
        <label htmlFor="species" className="mb-1">Especie</label>
        <input
          id="species"
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="type" className="mb-1">Tipo</label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="gender" className="mb-1">Género</label>
        <input
          id="gender"
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col mb-2 text-left text-white">
        <label htmlFor="status" className="mb-1">Estado</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      {error && <p className="text-white bg-red-700 p-2 mb-2">{error}</p>}
      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/dashboard/personajes"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver
        </Link>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Crear Personaje</button>
      </div>
    </form>
  );
}