import React, { useState } from 'react';
import { Character } from '@/types/character';
import { updateCharacter } from '@/app/service/api-character';
import { useToast } from '@/components/ui/use-toast';

interface ChangeStatusModalProps {
  character: Character;
  onClose: () => void;
  onStatusChanged: (updatedCharacter: Character) => void;
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({ character, onClose, onStatusChanged }) => {
  const [status, setStatus] = useState(character.status || 'unknown');
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async () => {
    if (!status) {
      setError('El estado es obligatorio');
      toast({
        title: 'Error',
        description: 'El estado es obligatorio.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const updatedCharacter = { ...character, status };
      await updateCharacter(updatedCharacter);
      onStatusChanged(updatedCharacter);
      toast({
        title: 'Éxito',
        description: 'Estado del personaje actualizado exitosamente.',
      });
      onClose();
    } catch (err) {
      setError('Error actualizando el estado del personaje');
      toast({
        title: 'Error',
        description: 'Hubo un error al actualizar el estado del personaje.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl text-slate-900 font-semibold mb-4">Cambiar Estado del Personaje</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 text-gray-700">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleStatusChange} 
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;
