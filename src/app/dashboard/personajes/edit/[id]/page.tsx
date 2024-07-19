"use client";

import Sidebar from '@/components/sidebar';
import React, { useEffect, useState } from 'react';
import EditCharacterForm from '../../editCharacterForm';
import Image from 'next/image';
import { Character } from '@/types/character';
import { useParams, useRouter } from 'next/navigation';
import { updateCharacter, fetchCharacterById } from '@/app/service/api-character';

const EditCharacterPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (id) {
          const fetchedCharacter = await fetchCharacterById(Number(id));
          setCharacter(fetchedCharacter);
        }
      } catch (error) {
        console.error("Error fetching character:", error);
        router.push('/'); // Redirecciona si hay un error
      }
    };

    fetchCharacter();
  }, [id, router]);

  const handleCharacterUpdated = async (updatedCharacter: Character) => {
    try {
      await updateCharacter(updatedCharacter);
      router.push('/dashboard/personajes'); // Redirecciona a la lista de personajes
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  if (!character) {
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
                <EditCharacterForm character={character} onCharacterUpdated={handleCharacterUpdated} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCharacterPage;
