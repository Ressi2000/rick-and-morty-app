"use client";
import Sidebar from '@/components/sidebar';
import React, { useState } from 'react';
import CreateCharacterForm from '../createCharacterForm';
import Image from 'next/image';
import { Character } from '@/types/character';

export default function CreateCharacterPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleCharacterCreated = (newCharacter: Character) => {
    setCharacters([...characters, newCharacter]);
  };

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
                <CreateCharacterForm onCharacterCreated={handleCharacterCreated} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}