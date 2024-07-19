"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCharacters } from "../../service/api-character";
import { Character } from "@/types/character";
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
import ChangeStatusModal from "@/components/statusCharacterModal";

const CharactersTable = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState({
    species: "",
    type: "",
    gender: "",
    name: "",
  });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (character: Character) => {
    router.push(`/dashboard/personajes/edit/${character.id}`);
  };

  const handleStatusChangeClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleStatusChanged = (updatedCharacter: Character) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
    closeModal();
  };

  const filteredCharacters = characters.filter((character) =>
    (filters.species ? character.species.includes(filters.species) : true) &&
    (filters.type ? character.type.includes(filters.type) : true) &&
    (filters.gender ? character.gender.includes(filters.gender) : true) &&
    (filters.name ? character.name.includes(filters.name) : true)
  );

  const paginatedCharacters = filteredCharacters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPageCount = Math.ceil(filteredCharacters.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="species"
          placeholder="Especie"
          value={filters.species}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="type"
          placeholder="Tipo"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="gender"
          placeholder="Género"
          value={filters.gender}
          onChange={handleFilterChange}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white font-bold">Imagen</TableHead>
            <TableHead className="text-white font-bold">Nombre</TableHead>
            <TableHead className="text-white font-bold">Especie</TableHead>
            <TableHead className="text-white font-bold">Tipo</TableHead>
            <TableHead className="text-white font-bold">Género</TableHead>
            <TableHead className="text-white font-bold">Estado</TableHead>
            <TableHead className="text-white font-bold">Opciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCharacters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>
                {character.image ? (
                  <img src={character.image} alt={character.name} className="w-12 h-12 rounded-full" />
                ) : (
                  <img src="https://rickandmortyapi.com/api/character/avatar/19.jpeg" alt="Default Character" className="w-12 h-12 rounded-full" />
                )}
              </TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.type}</TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="font-bold">Opciones</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditClick(character)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChangeClick(character)}>
                      Cambiar Estado
                    </DropdownMenuItem>
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
      />
      {selectedCharacter && (
        <ChangeStatusModal
          character={selectedCharacter}
          onClose={closeModal}
          onStatusChanged={handleStatusChanged}
        />
      )}
    </div>
  );
};

export default CharactersTable;
