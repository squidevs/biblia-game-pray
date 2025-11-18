import React, { useEffect, useState } from 'react';
import { inventoryManager, EquippedItem } from '../utils/inventoryManager';
import { X, Infinity, Package, Sparkles, BookOpen } from 'lucide-react';

interface EquippedItemsSlotsProps {
  onUpdate?: () => void;
  compact?: boolean; // Modo compacto para header
}

const EquippedItemsSlots: React.FC<EquippedItemsSlotsProps> = ({ onUpdate, compact = false }) => {
  const [consumableSlots, setConsumableSlots] = useState<(EquippedItem | null)[]>([null, null, null]);
  const [permanentSlots, setPermanentSlots] = useState<(EquippedItem | null)[]>([null, null]);

  useEffect(() => {
    loadSlots();
    
    // Atualizar a cada segundo para timers
    const interval = setInterval(() => {
      inventoryManager.clearExpiredItems();
      loadSlots();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadSlots = () => {
    const slots = inventoryManager.getEquippedSlots();
    console.log('🎒 Slots carregados:', slots);
    setConsumableSlots(slots.consumableSlots);
    setPermanentSlots(slots.permanentSlots);
  };

  const handleUnequip = (slotType: 'consumable' | 'permanent', index: number) => {
    inventoryManager.unequipItemFromSlot(slotType, index);
    loadSlots();
    onUpdate?.();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSlot = (slot: EquippedItem | null, type: 'consumable' | 'permanent', index: number) => {
    if (!slot) {
      return (
        <div className="relative bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center p-1 h-9 w-9 sm:h-11 sm:w-11">
          <Package className="w-4 h-4 text-gray-500" />
        </div>
      );
    }
    const timeRemaining = inventoryManager.getTimeRemaining(slot);
    const isPermanent = timeRemaining === null;
    return (
      <div className="relative bg-gradient-to-br from-purple-600/40 to-indigo-600/40 border-purple-400 border-2 rounded-lg flex items-center justify-center p-1 h-9 w-9 sm:h-11 sm:w-11">
        {/* Ícone centralizado */}
        <div className="flex items-center justify-center w-full h-full">
          {type === 'permanent' ? (
            slot.name === 'Bíblia Sagrada' ? (
              <BookOpen className="w-4 h-4 text-purple-200" />
            ) : (
              <Sparkles className="w-4 h-4 text-purple-200" />
            )
          ) : (
            <Package className="w-4 h-4 text-blue-200" />
          )}
        </div>
        {/* Badge infinito no canto inferior direito */}
        {isPermanent && (
          <span className="absolute bottom-0 text-white text-[10px] font-bold">
            <Infinity className="w-3 h-3" />
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={compact ? '' : 'bg-white rounded-lg p-3 shadow-sm border border-gray-100'}>
      {!compact && <h4 className="text-xs font-semibold text-gray-700 mb-2">Itens Equipados</h4>}
      
      <div className={`flex items-center ${compact ? 'gap-1 sm:gap-1.5 justify-center' : 'gap-2'}`}>
        {/* Permanentes - 2 slots (PRIMEIRO) */}
        {permanentSlots.map((slot, index) => (
          <div key={`permanent-${index}`}>
            {renderSlot(slot, 'permanent', index)}
          </div>
        ))}

        {/* Separador visual */}
        {compact && <div className="w-px h-10 bg-gray-600" />}

        {/* Consumíveis - 3 slots (DEPOIS) */}
        {consumableSlots.map((slot, index) => (
          <div key={`consumable-${index}`}>
            {renderSlot(slot, 'consumable', index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquippedItemsSlots;
