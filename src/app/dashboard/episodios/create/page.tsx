"use client";
import Sidebar from '@/components/sidebar';
import React, { useState } from 'react';
import Image from 'next/image';
import CreateEpisodeForm from '../createEpisodesForm';
import { Episode } from '@/types/episodes';

export default function CreateEpisodePage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    const handleEpisodeCreated = (newEpisode: Episode) => {
        setEpisodes([...episodes, newEpisode]);
    };

    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            <Sidebar />
            <main className="flex-grow p-4 bg-slate-800 bg-opacity-40 backdrop-blur-md">
                <div className="flex flex-col w-full h-full px-3 py-4 md:px-2 bg-gray-800 bg-opacity-50 text-white border border-y-rose-50">
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <div className="glassmorphism p-8 w-full max-w-md mx-auto text-center mb-6">
                            <Image
                                src="/customers/ram-logo.png"
                                alt="Rick and Morty Logo"
                                width={450}
                                height={150}
                                className="object-contain mb-4"
                            />
                            <CreateEpisodeForm onEpisodeCreated={handleEpisodeCreated} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
