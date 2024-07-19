"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import EpisodesTable from "./episodesTable";

export default function EpisodesPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <Sidebar />
      <main className="flex-grow p-4 bg-slate-800 bg-opacity-40 backdrop-blur-md">
        <div className="flex flex-col w-full h-full px-3 py-4 md:px-2 bg-gray-800 bg-opacity-50 text-white border border-y-rose-50">
          <div className="mb-4 flex justify-start">
            <Link
              href="/dashboard/episodios/create"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Crear Episodio
            </Link>
          </div>
          <div className="flex flex-col w-full overflow-x-auto">
            <EpisodesTable />
          </div>
        </div>
      </main>
    </div>
  );
}
