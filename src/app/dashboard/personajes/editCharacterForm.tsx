import React, { useState, useEffect } from 'react';
import { updateCharacter } from '../../service/api-character';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character'; // Asegúrate de importar el tipo Character

interface EditCharacterFormProps {
  character: Character; // Usa el tipo Character aquí
  onCharacterUpdated: (updatedCharacter: Character) => void; // Actualiza la firma de la función
}

export default function EditCharacterForm({ character, onCharacterUpdated }: EditCharacterFormProps) {
  const [name, setName] = useState(character.name || '');
  const [species, setSpecies] = useState(character.species || '');
  const [type, setType] = useState(character.type || '');
  const [gender, setGender] = useState(character.gender || '');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(character.name || '');
    setSpecies(character.species || '');
    setType(character.type || '');
    setGender(character.gender || '');
  }, [character]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !species || !gender) {
      setError('Todos los campos son obligatorios');
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const updatedCharacter: Character = { ...character, name, species, type, gender };
      await updateCharacter(updatedCharacter); // Actualiza el personaje
      onCharacterUpdated(updatedCharacter); // Llama a la función con el personaje actualizado
      setError(null);
      toast({
        title: 'Éxito',
        description: 'Personaje actualizado exitosamente.',
      });
    } catch (err) {
      setError('Error actualizando el personaje');
      toast({
        title: 'Error',
        description: 'Hubo un error al actualizar el personaje.',
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
      {error && <p className="text-white bg-red-700 p-2 mb-2">{error}</p>}
      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/dashboard/personajes"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Volver
        </Link>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Actualizar Personaje</button>
      </div>
    </form>
  );
}
