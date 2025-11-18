import React, { useState, useEffect } from 'react';
import { 
  Package, Shield, ShieldCheck, Sword, Footprints, Crown, 
  BookOpen, Droplet, Flame, Heart, CheckCircle2, X
} from 'lucide-react';
import { inventoryManager } from '../utils/inventoryManager';

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: 'armadura' | 'consumivel' | 'permanente';
  rarity: 'comum' | 'raro' | 'epico' | 'lendario' | 'divino' | 'sagrado';
  quantity: number;
  equipped: boolean;
  duration?: string;
  expiresAt?: number;
}

interface ItemCardProps {
  item: InventoryItem;
  onEquip: (itemId: string) => void;
  onUnequip: (itemId: string) => void;
  onUse: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEquip, onUnequip, onUse }) => {
  const getIcon = () => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Bíblia Sagrada': <BookOpen className="w-6 h-6" />,
      'Cinturão da Verdade': <Shield className="w-6 h-6" />,
      'Couraça da Justiça': <ShieldCheck className="w-6 h-6" />,
      'Sandálias do Evangelho': <Footprints className="w-6 h-6" />,
      'Escudo da Fé': <Shield className="w-6 h-6" />,
      'Capacete da Salvação': <Crown className="w-6 h-6" />,
      'Espada do Espírito': <Sword className="w-6 h-6" />,
      'Óleo de Unção': <Droplet className="w-6 h-6" />,
      'Fogo do Espírito': <Flame className="w-6 h-6" />,
      'Amor Divino': <Heart className="w-6 h-6" />
    };
    return iconMap[item.name] || <Package className="w-6 h-6" />;
  };

  const getRarityColor = () => {
    switch (item.rarity) {
      case 'comum': return 'border-gray-400 bg-gray-50';
      case 'raro': return 'border-blue-500 bg-blue-50';
      case 'epico': return 'border-purple-500 bg-purple-50';
      case 'lendario': return 'border-yellow-500 bg-yellow-50';
      case 'divino': return 'border-red-500 bg-red-50';
      case 'sagrado': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getRarityBadgeColor = () => {
    switch (item.rarity) {
      case 'comum': return 'bg-gray-500 text-white';
      case 'raro': return 'bg-blue-500 text-white';
      case 'epico': return 'bg-purple-500 text-white';
      case 'lendario': return 'bg-yellow-500 text-white';
      case 'divino': return 'bg-red-500 text-white';
      case 'sagrado': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className={`relative rounded-lg border-2 ${getRarityColor()} p-4 transition-all hover:shadow-md`}>
      {/* Badge de Equipado */}
      {item.equipped && (
        <div className="absolute -top-2 -right-2 bg-victory rounded-full p-1 shadow-lg z-[5]">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Ícone */}
      <div className="flex flex-col items-center space-y-3">
        <div className="text-spiritual">
          {getIcon()}
        </div>

        {/* Nome */}
        <h3 className="font-semibold text-sm text-center line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h3>

        {/* Raridade Badge */}
        <span className={`text-xs px-2 py-0.5 rounded-full ${getRarityBadgeColor()}`}>
          {item.rarity}
        </span>

        {/* Quantidade */}
        {item.type === 'consumivel' && (
          <div className="text-center">
            <span className="text-lg font-bold text-wisdom">{item.quantity}x</span>
          </div>
        )}

        {/* Descrição */}
        <p className="text-xs text-gray-600 text-center line-clamp-2 min-h-[2rem]">
          {item.description}
        </p>

        {/* Duração (se consumível ativo) */}
        {item.type === 'consumivel' && item.expiresAt && (
          <div className="text-xs text-spiritual font-medium">
            Ativo: {item.duration}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="w-full space-y-2">
          {item.type === 'armadura' && (
            <>
              {item.equipped ? (
                <button
                  onClick={() => onUnequip(item.id)}
                  className="w-full bg-sin text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Desequipar
                </button>
              ) : (
                <button
                  onClick={() => onEquip(item.id)}
                  className="w-full bg-victory text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Equipar
                </button>
              )}
            </>
          )}

          {item.type === 'consumivel' && item.quantity > 0 && (
            <button
              onClick={() => onUse(item.id)}
              className="w-full bg-spiritual text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Usar
            </button>
          )}

          {item.type === 'permanente' && (
            <>
              {item.equipped ? (
                <button
                  onClick={() => onUnequip(item.id)}
                  className="w-full bg-sin text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Desequipar
                </button>
              ) : (
                <button
                  onClick={() => onEquip(item.id)}
                  className="w-full bg-victory text-white text-xs py-2 px-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Equipar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filter, setFilter] = useState<'todos' | 'armadura' | 'consumivel' | 'permanente'>('todos');

  // Converter do formato do inventoryManager para InventoryItem[]
  const convertInventoryToItems = (): InventoryItem[] => {
    const inventory = inventoryManager.loadInventory();
    const itemsList: InventoryItem[] = [];

    // Peças da armadura
    Object.values(inventory.armor).forEach(armorPiece => {
      if (armorPiece.obtained) {
        itemsList.push({
          id: armorPiece.id,
          name: armorPiece.name,
          description: `Integridade: ${armorPiece.integrity}%`,
          type: 'armadura',
          rarity: 'sagrado',
          quantity: 1,
          equipped: armorPiece.equipped
        });
      }
    });

    // Consumíveis
    if (inventory.consumables.pocao_cura > 0) {
      itemsList.push({
        id: 'pocao_cura',
        name: 'Poção de Cura',
        description: 'Restaura vida espiritual',
        type: 'consumivel',
        rarity: 'raro',
        quantity: inventory.consumables.pocao_cura,
        equipped: false
      });
    }

    if (inventory.consumables.energetico > 0) {
      itemsList.push({
        id: 'energetico',
        name: 'Energético Espiritual',
        description: 'Restaura energia do Espírito Santo',
        type: 'consumivel',
        rarity: 'raro',
        quantity: inventory.consumables.energetico,
        equipped: false
      });
    }

    if (inventory.consumables.pergaminho > 0) {
      itemsList.push({
        id: 'pergaminho',
        name: 'Pergaminho de Sabedoria',
        description: 'Aumenta sabedoria',
        type: 'consumivel',
        rarity: 'epico',
        quantity: inventory.consumables.pergaminho,
        equipped: false
      });
    }

    // Itens genéricos
    inventory.items.forEach((item) => {
      // Verificar se está equipado nos slots permanentes
      const isEquipped = inventory.equippedItems.permanentSlots.some(
        slot => slot && slot.name === item.name
      );

      itemsList.push({
        id: `item-${item.name}`,
        name: item.name,
        description: 'Item especial',
        type: 'permanente',
        rarity: 'comum',
        quantity: item.quantity,
        equipped: isEquipped
      });
    });

    return itemsList;
  };

  // Carregar inventário
  useEffect(() => {
    const itemsList = convertInventoryToItems();
    setItems(itemsList);
  }, []);

  // Salvar inventário sempre que mudar (converter de volta)
  useEffect(() => {
    if (items.length === 0) return;

    items.forEach(item => {
      if (item.type === 'armadura') {
        const key = item.id as 'cinturao' | 'couraca' | 'sandalias' | 'escudo' | 'capacete' | 'espada';
        if (item.equipped) {
          inventoryManager.equipArmor(key);
        } else {
          inventoryManager.unequipArmor(key);
        }
      }
    });
  }, [items]);

  const handleEquip = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Se for item permanente (como a Bíblia)
    if (item.type === 'permanente') {
      const equippedItem = {
        id: itemId,
        name: item.name,
        type: 'permanent' as const,
        duration: undefined, // permanente
        equippedAt: Date.now(),
        icon: '📖'
      };

      const equipped = inventoryManager.equipItemToSlot(equippedItem, 'permanent');
      
      if (equipped) {
        console.log('✅ Item permanente equipado:', item.name);
        alert(`✨ ${item.name} equipado no slot permanente!`);
        
        setItems(prevItems =>
          prevItems.map(i =>
            i.id === itemId ? { ...i, equipped: true } : i
          )
        );
      } else {
        alert('⚠️ Todos os slots permanentes estão ocupados! Desequipe um item primeiro.');
      }
      return;
    }

    // Se for armadura
    const key = itemId as 'cinturao' | 'couraca' | 'sandalias' | 'escudo' | 'capacete' | 'espada';
    if (inventoryManager.equipArmor(key)) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, equipped: true } : item
        )
      );
    }
  };

  const handleUnequip = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Se for item permanente
    if (item.type === 'permanente') {
      const inventory = inventoryManager.loadInventory();
      const slotIndex = inventory.equippedItems.permanentSlots.findIndex(
        slot => slot && slot.id === itemId
      );
      
      if (slotIndex !== -1) {
        inventoryManager.unequipItemFromSlot('permanent', slotIndex);
        console.log('✅ Item permanente desequipado:', item.name);
        
        setItems(prevItems =>
          prevItems.map(i =>
            i.id === itemId ? { ...i, equipped: false } : i
          )
        );
      }
      return;
    }

    // Se for armadura
    const key = itemId as 'cinturao' | 'couraca' | 'sandalias' | 'escudo' | 'capacete' | 'espada';
    inventoryManager.unequipArmor(key);
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, equipped: false } : item
      )
    );
  };

  const handleUse = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.quantity <= 0) return;

    const consumableType = itemId as 'pocao_cura' | 'energetico' | 'pergaminho';
    
    // Tentar equipar no slot primeiro
    const equippedItem = {
      id: itemId,
      name: item.name,
      type: 'consumable' as const,
      duration: 300, // 5 minutos
      equippedAt: Date.now(),
      icon: '🧪'
    };

    const equipped = inventoryManager.equipItemToSlot(equippedItem, 'consumable');
    
    if (equipped) {
      console.log('✅ Item equipado no slot:', item.name);
      // Reduzir quantidade
      if (inventoryManager.useConsumable(consumableType)) {
        alert(`✨ ${item.name} equipado! Efeito ativo por 5 minutos.`);
        
        setItems(prevItems =>
          prevItems.map(i => {
            if (i.id === itemId) {
              const newQuantity = i.quantity - 1;
              return { ...i, quantity: newQuantity };
            }
            return i;
          }).filter(i => i.quantity > 0 || i.type === 'armadura')
        );
      }
    } else {
      alert('⚠️ Todos os slots de consumíveis estão ocupados! Desequipe um item primeiro.');
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'todos') return true;
    return item.type === filter;
  });

  const stats = {
    total: items.length,
    equipados: items.filter(i => i.equipped).length,
    consumiveis: items.filter(i => i.type === 'consumivel').length,
    armadura: items.filter(i => i.type === 'armadura').length
  };

  return (
    <div className="min-h-screen bg-primary pb-20">
      {/* Header com legendas fixas */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="p-4">
          <div className="text-center mb-4">
            <h1 className="font-sans text-2xl font-bold text-dark mb-1">
              Inventário Sagrado
            </h1>
            <p className="text-sm text-gray-600">
              Gerencie seus itens espirituais
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-spiritual/10 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-spiritual">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-victory/10 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-victory">{stats.equipados}</div>
              <div className="text-xs text-gray-600">Equipados</div>
            </div>
            <div className="bg-wisdom/10 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-wisdom">{stats.armadura}</div>
              <div className="text-xs text-gray-600">Armadura</div>
            </div>
            <div className="bg-sin/10 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-sin">{stats.consumiveis}</div>
              <div className="text-xs text-gray-600">Consumíveis</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['todos', 'armadura', 'consumivel', 'permanente'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-spiritual text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Legenda de Raridade */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-xs font-semibold mb-2 text-gray-700">Raridade:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Comum', color: 'border-gray-400 bg-gray-400' },
                { name: 'Raro', color: 'border-blue-500 bg-blue-500' },
                { name: 'Épico', color: 'border-purple-500 bg-purple-500' },
                { name: 'Lendário', color: 'border-yellow-500 bg-yellow-500' },
                { name: 'Divino', color: 'border-red-500 bg-red-500' },
                { name: 'Sagrado', color: 'border-green-500 bg-green-500' }
              ].map(rarity => (
                <div key={rarity.name} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${rarity.color}`}></div>
                  <span className="text-xs text-gray-600">{rarity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Itens - 3 colunas */}
      <div className="p-4">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEquip={handleEquip}
                onUnequip={handleUnequip}
                onUse={handleUse}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum item encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;