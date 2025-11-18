import { safeLocalStorage } from './storage';

export interface ArmorPiece {
  id: string;
  name: string;
  obtained: boolean;
  equipped: boolean;
  integrity: number;
  level: number;
}

export interface EquippedItem {
  id: string;
  name: string;
  type: 'consumable' | 'permanent';
  duration?: number; // em segundos, undefined = permanente
  equippedAt: number; // timestamp
  icon: string;
}

interface PlayerInventory {
  items: { name: string; quantity: number }[];
  armor: {
    cinturao: ArmorPiece;
    couraca: ArmorPiece;
    sandalias: ArmorPiece;
    escudo: ArmorPiece;
    capacete: ArmorPiece;
    espada: ArmorPiece;
  };
  consumables: {
    pocao_cura: number;
    energetico: number;
    pergaminho: number;
  };
  equippedItems: {
    consumableSlots: (EquippedItem | null)[]; // 3 slots
    permanentSlots: (EquippedItem | null)[]; // 2 slots
  };
}

const INVENTORY_KEY = 'christon-inventory';

const createDefaultArmor = (): PlayerInventory['armor'] => ({
  cinturao: { id: 'cinturao', name: 'Cinturão da Verdade', obtained: false, equipped: false, integrity: 0, level: 1 },
  couraca: { id: 'couraca', name: 'Couraça da Justiça', obtained: false, equipped: false, integrity: 0, level: 1 },
  sandalias: { id: 'sandalias', name: 'Sandálias da Prontidão', obtained: false, equipped: false, integrity: 0, level: 1 },
  escudo: { id: 'escudo', name: 'Escudo da Fé', obtained: false, equipped: false, integrity: 0, level: 1 },
  capacete: { id: 'capacete', name: 'Capacete da Salvação', obtained: false, equipped: false, integrity: 0, level: 1 },
  espada: { id: 'espada', name: 'Espada do Espírito', obtained: false, equipped: false, integrity: 0, level: 1 }
});

export const inventoryManager = {
  loadInventory(): PlayerInventory {
    try {
      const saved = safeLocalStorage.getItem(INVENTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.equipment) {
          const newInventory: PlayerInventory = {
            items: [],
            armor: createDefaultArmor(),
            consumables: { pocao_cura: 0, energetico: 0, pergaminho: 0 },
            equippedItems: {
              consumableSlots: [null, null, null],
              permanentSlots: [null, null]
            }
          };
          if (parsed.equipment.cinturao) { newInventory.armor.cinturao.obtained = true; newInventory.armor.cinturao.equipped = true; }
          if (parsed.equipment.couraca) { newInventory.armor.couraca.obtained = true; newInventory.armor.couraca.equipped = true; }
          if (parsed.equipment.sandalias) { newInventory.armor.sandalias.obtained = true; newInventory.armor.sandalias.equipped = true; }
          if (parsed.equipment.escudo) { newInventory.armor.escudo.obtained = true; newInventory.armor.escudo.equipped = true; }
          if (parsed.equipment.capacete) { newInventory.armor.capacete.obtained = true; newInventory.armor.capacete.equipped = true; }
          if (parsed.equipment.espada) { newInventory.armor.espada.obtained = true; newInventory.armor.espada.equipped = true; }
          this.saveInventory(newInventory);
          return newInventory;
        }
        // Garantir que equippedItems existe
        if (!parsed.equippedItems) {
          parsed.equippedItems = {
            consumableSlots: [null, null, null],
            permanentSlots: [null, null]
          };
        }
        return parsed;
      }
    } catch (error) {
      console.warn('Erro ao carregar inventário:', error);
    }
    return { 
      items: [], 
      armor: createDefaultArmor(), 
      consumables: { pocao_cura: 0, energetico: 0, pergaminho: 0 },
      equippedItems: {
        consumableSlots: [null, null, null],
        permanentSlots: [null, null]
      }
    };
  },

  saveInventory(inventory: PlayerInventory): void {
    try {
      safeLocalStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (error) {
      console.error('Erro ao salvar inventário:', error);
    }
  },

  addItem(itemName: string): void {
    console.log(`📦 Tentando adicionar item: "${itemName}"`);
    const inventory = this.loadInventory();
    const itemLower = itemName.toLowerCase();
    
    if (itemLower.includes('cinturão') || itemLower.includes('cinturao') || itemLower.includes('cinto')) {
      inventory.armor.cinturao.obtained = true;
      console.log('  ✅ Cinturão da Verdade adicionado!');
    } else if (itemLower.includes('couraça') || itemLower.includes('couraca')) {
      inventory.armor.couraca.obtained = true;
      console.log('  ✅ Couraça da Justiça adicionada!');
    } else if (itemLower.includes('sandálias') || itemLower.includes('sandalias') || itemLower.includes('calçado')) {
      inventory.armor.sandalias.obtained = true;
      console.log('  ✅ Sandálias da Prontidão adicionadas!');
    } else if (itemLower.includes('escudo')) {
      inventory.armor.escudo.obtained = true;
      console.log('  ✅ Escudo da Fé adicionado!');
    } else if (itemLower.includes('capacete')) {
      inventory.armor.capacete.obtained = true;
      console.log('  ✅ Capacete da Salvação adicionado!');
    } else if (itemLower.includes('espada')) {
      inventory.armor.espada.obtained = true;
      console.log('  ✅ Espada do Espírito adicionada!');
    } else if (itemLower.includes('poção') || itemLower.includes('pocao') || itemLower.includes('cura')) {
      inventory.consumables.pocao_cura += 1;
      console.log('  ✅ Poção de Cura adicionada!');
    } else if (itemLower.includes('energético') || itemLower.includes('energetico') || itemLower.includes('energia')) {
      inventory.consumables.energetico += 1;
      console.log('  ✅ Energético adicionado!');
    } else if (itemLower.includes('pergaminho') || itemLower.includes('scroll')) {
      inventory.consumables.pergaminho += 1;
      console.log('  ✅ Pergaminho adicionado!');
    } else {
      const existingItem = inventory.items.find(i => i.name === itemName);
      if (existingItem) {
        existingItem.quantity += 1;
        console.log(`  ✅ Item "${itemName}" quantidade aumentada para ${existingItem.quantity}`);
      } else {
        inventory.items.push({ name: itemName, quantity: 1 });
        console.log(`  ✅ Novo item adicionado: "${itemName}"`);
      }
    }
    this.saveInventory(inventory);
    console.log('  💾 Inventário salvo!');
  },

  equipArmor(pieceId: keyof PlayerInventory['armor']): boolean {
    const inventory = this.loadInventory();
    const piece = inventory.armor[pieceId];
    if (!piece.obtained) return false;
    piece.equipped = true;
    this.saveInventory(inventory);
    return true;
  },

  unequipArmor(pieceId: keyof PlayerInventory['armor']): void {
    const inventory = this.loadInventory();
    inventory.armor[pieceId].equipped = false;
    this.saveInventory(inventory);
  },

  addArmorIntegrity(pieceId: keyof PlayerInventory['armor'], points: number): void {
    const inventory = this.loadInventory();
    const piece = inventory.armor[pieceId];
    if (piece.obtained) {
      piece.integrity = Math.min(100, piece.integrity + points);
      this.saveInventory(inventory);
    }
  },

  getArmorForHUD() {
    const inventory = this.loadInventory();
    return {
      beltOfTruth: { equipped: inventory.armor.cinturao.equipped, integrity: inventory.armor.cinturao.integrity, level: inventory.armor.cinturao.level },
      breastplateOfRighteousness: { equipped: inventory.armor.couraca.equipped, integrity: inventory.armor.couraca.integrity, level: inventory.armor.couraca.level },
      sandalsOfPeace: { equipped: inventory.armor.sandalias.equipped, integrity: inventory.armor.sandalias.integrity, level: inventory.armor.sandalias.level },
      shieldOfFaith: { equipped: inventory.armor.escudo.equipped, integrity: inventory.armor.escudo.integrity, level: inventory.armor.escudo.level },
      helmetOfSalvation: { equipped: inventory.armor.capacete.equipped, integrity: inventory.armor.capacete.integrity, level: inventory.armor.capacete.level },
      swordOfSpirit: { equipped: inventory.armor.espada.equipped, integrity: inventory.armor.espada.integrity, level: inventory.armor.espada.level },
      cloakOfWisdom: { equipped: false, integrity: 0, level: 1 }
    };
  },

  hasSword(): boolean {
    const inventory = this.loadInventory();
    return inventory.armor.espada.equipped;
  },

  hasArmorPiece(piece: keyof PlayerInventory['armor']): boolean {
    const inventory = this.loadInventory();
    return inventory.armor[piece].equipped;
  },

  getEquippedArmor(): string[] {
    const inventory = this.loadInventory();
    const equipped: string[] = [];
    Object.values(inventory.armor).forEach(piece => {
      if (piece.equipped) equipped.push(piece.name);
    });
    return equipped;
  },

  useConsumable(type: keyof PlayerInventory['consumables']): boolean {
    const inventory = this.loadInventory();
    if (inventory.consumables[type] > 0) {
      inventory.consumables[type] -= 1;
      this.saveInventory(inventory);
      return true;
    }
    return false;
  },

  // Equipar item em slot
  equipItemToSlot(item: EquippedItem, slotType: 'consumable' | 'permanent'): boolean {
    const inventory = this.loadInventory();
    const slots = slotType === 'consumable' ? inventory.equippedItems.consumableSlots : inventory.equippedItems.permanentSlots;
    
    // Encontrar slot vazio
    const emptyIndex = slots.findIndex(slot => slot === null);
    if (emptyIndex === -1) return false; // Sem slots vazios
    
    slots[emptyIndex] = {
      ...item,
      equippedAt: Date.now()
    };
    
    this.saveInventory(inventory);
    return true;
  },

  // Desequipar item de slot
  unequipItemFromSlot(slotType: 'consumable' | 'permanent', slotIndex: number): void {
    const inventory = this.loadInventory();
    if (slotType === 'consumable') {
      inventory.equippedItems.consumableSlots[slotIndex] = null;
    } else {
      inventory.equippedItems.permanentSlots[slotIndex] = null;
    }
    this.saveInventory(inventory);
  },

  // Limpar slots expirados
  clearExpiredItems(): void {
    const inventory = this.loadInventory();
    const now = Date.now();
    
    inventory.equippedItems.consumableSlots = inventory.equippedItems.consumableSlots.map(slot => {
      if (slot && slot.duration) {
        const elapsed = (now - slot.equippedAt) / 1000; // em segundos
        if (elapsed >= slot.duration) {
          console.log(`⏱️ Item expirado: ${slot.name}`);
          return null;
        }
      }
      return slot;
    });
    
    this.saveInventory(inventory);
  },

  // Obter tempo restante de um item
  getTimeRemaining(slot: EquippedItem): number | null {
    if (!slot.duration) return null; // Permanente
    const elapsed = (Date.now() - slot.equippedAt) / 1000;
    return Math.max(0, slot.duration - elapsed);
  },

  // Obter slots equipados
  getEquippedSlots() {
    const inventory = this.loadInventory();
    return inventory.equippedItems;
  },

  resetInventory(): void {
    safeLocalStorage.removeItem(INVENTORY_KEY);
  }
};
