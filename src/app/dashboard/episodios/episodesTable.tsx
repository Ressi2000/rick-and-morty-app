"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { fetchEpisodes } from "../../service/api-episodes";
import { Episode } from "@/types/episodes";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Pagination } from "@/components/ui/pagination";

const EpisodesTable: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filters, setFilters] = useState<{ name: string; episode: string }>({
    name: "",
    episode: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEpisodes();
      setEpisodes(data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (episode: Episode) => {
    router.push(`/dashboard/episodios/edit/${episode.id}`);
  };

  const filteredEpisodes = episodes.filter((episode) =>
    (filters.name ? episode.name.includes(filters.name) : true) &&
    (filters.episode ? episode.episode.includes(filters.episode) : true)
  );
  const paginatedEpisodes = filteredEpisodes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPageCount = Math.ceil(filteredEpisodes.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 flex flex-wrap gap-2">
        <Input
          type="text"
          name="name"
          placeholder="Nombre del Episodio"
          value={filters.name}
          onChange={handleFilterChange}
          className="w-full md:w-auto"
        />
        <Input
          type="text"
          name="episode"
          placeholder="Código del Episodio"
          value={filters.episode}
          onChange={handleFilterChange}
          className="w-full md:w-auto"
        />
      </div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white font-bold">Nombre</TableHead>
            <TableHead className="text-white font-bold">Código del Episodio</TableHead>
            <TableHead className="text-white font-bold">Fecha de Emisión</TableHead>
            <TableHead className="text-white font-bold">Opciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEpisodes.map((episode) => (
            <TableRow key={episode.id}>
              <TableCell>{episode.name}</TableCell>
              <TableCell>{episode.episode}</TableCell>
              <TableCell>{episode.air_date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="font-bold">Opciones</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditClick(episode)}>Editar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalPages={totalPageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className="mt-4"
      />
    </div>
  );
};

export default EpisodesTable;
