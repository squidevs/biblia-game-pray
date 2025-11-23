import { generateAvatarURL, generateSID, saveAvatarConfig, updateProfileAvatar } from "./avataaars.js";

window.avatarEditorStore = function avatarEditorStore() {
  return {
    loading: true,
    saving: false,
    config: {
      topType: "ShortHairShortCurly",
      accessoriesType: "Blank",
      hairColor: "BrownDark",
      facialHairType: "Blank",
      clotheType: "Hoodie",
      clotheColor: "Black",
      eyeType: "Default",
      eyebrowType: "Default",
      mouthType: "Default",
      skinColor: "Light"
    },
    categories: {
      topType: [
        { value: "ShortHairShortCurly", label: "Curto Cacheado" },
        { value: "ShortHairShortFlat", label: "Curto Liso" },
        { value: "ShortHairShortRound", label: "Curto Redondo" },
        { value: "LongHairStraight", label: "Longo Liso" },
        { value: "LongHairCurly", label: "Longo Cacheado" },
        { value: "LongHairFrida", label: "Frida" },
        { value: "LongHairShavedSides", label: "Raspado nas Laterais" },
        { value: "NoHair", label: "Careca" }
      ],
      accessoriesType: [
        { value: "Blank", label: "Nenhum" },
        { value: "Kurt", label: "Boné" },
        { value: "Prescription01", label: "Óculos 1" },
        { value: "Prescription02", label: "Óculos 2" },
        { value: "Round", label: "Óculos Redondos" },
        { value: "Sunglasses", label: "Óculos de Sol" },
        { value: "Wayfarers", label: "Wayfarers" }
      ],
      hairColor: [
        { value: "Auburn", label: "Ruivo" },
        { value: "Black", label: "Preto" },
        { value: "Blonde", label: "Loiro" },
        { value: "BlondeGolden", label: "Loiro Dourado" },
        { value: "Brown", label: "Marrom" },
        { value: "BrownDark", label: "Marrom Escuro" },
        { value: "PastelPink", label: "Rosa Pastel" },
        { value: "Platinum", label: "Platina" },
        { value: "Red", label: "Vermelho" },
        { value: "SilverGray", label: "Prata" }
      ],
      facialHairType: [
        { value: "Blank", label: "Nenhum" },
        { value: "BeardMedium", label: "Barba Média" },
        { value: "BeardLight", label: "Barba Leve" },
        { value: "BeardMagestic", label: "Barba Majestosa" },
        { value: "MoustacheFancy", label: "Bigode Elegante" },
        { value: "MoustacheMagnum", label: "Bigode Magnum" }
      ],
      clotheType: [
        { value: "BlazerShirt", label: "Blazer" },
        { value: "BlazerSweater", label: "Blazer com Suéter" },
        { value: "CollarSweater", label: "Suéter com Gola" },
        { value: "GraphicShirt", label: "Camiseta Estampada" },
        { value: "Hoodie", label: "Moletom" },
        { value: "Overall", label: "Macacão" },
        { value: "ShirtCrewNeck", label: "Camiseta" },
        { value: "ShirtScoopNeck", label: "Camiseta Gola Redonda" },
        { value: "ShirtVNeck", label: "Camiseta Gola V" }
      ],
      clotheColor: [
        { value: "Black", label: "Preto" },
        { value: "Blue01", label: "Azul 1" },
        { value: "Blue02", label: "Azul 2" },
        { value: "Blue03", label: "Azul 3" },
        { value: "Gray01", label: "Cinza 1" },
        { value: "Gray02", label: "Cinza 2" },
        { value: "Heather", label: "Heather" },
        { value: "PastelBlue", label: "Azul Pastel" },
        { value: "PastelGreen", label: "Verde Pastel" },
        { value: "PastelOrange", label: "Laranja Pastel" },
        { value: "PastelRed", label: "Vermelho Pastel" },
        { value: "PastelYellow", label: "Amarelo Pastel" },
        { value: "Pink", label: "Rosa" },
        { value: "Red", label: "Vermelho" },
        { value: "White", label: "Branco" }
      ],
      eyeType: [
        { value: "Default", label: "Padrão" },
        { value: "Close", label: "Fechado" },
        { value: "Cry", label: "Chorando" },
        { value: "Dizzy", label: "Tonto" },
        { value: "EyeRoll", label: "Revirando" },
        { value: "Happy", label: "Feliz" },
        { value: "Hearts", label: "Corações" },
        { value: "Side", label: "Lateral" },
        { value: "Squint", label: "Semicerrado" },
        { value: "Surprised", label: "Surpreso" },
        { value: "Wink", label: "Piscando" },
        { value: "WinkWacky", label: "Piscando Maluco" }
      ],
      eyebrowType: [
        { value: "Default", label: "Padrão" },
        { value: "DefaultNatural", label: "Natural" },
        { value: "FlatNatural", label: "Natural Reto" },
        { value: "RaisedExcited", label: "Elevado Animado" },
        { value: "RaisedExcitedNatural", label: "Elevado Natural" },
        { value: "SadConcerned", label: "Triste Preocupado" },
        { value: "SadConcernedNatural", label: "Triste Natural" },
        { value: "UnibrowNatural", label: "Uníssono Natural" },
        { value: "UpDown", label: "Para Cima e Baixo" },
        { value: "UpDownNatural", label: "Para Cima e Baixo Natural" }
      ],
      mouthType: [
        { value: "Default", label: "Padrão" },
        { value: "Concerned", label: "Preocupado" },
        { value: "Disbelief", label: "Descrença" },
        { value: "Eating", label: "Comendo" },
        { value: "Grimace", label: "Careta" },
        { value: "Sad", label: "Triste" },
        { value: "ScreamOpen", label: "Gritando Aberto" },
        { value: "Serious", label: "Sério" },
        { value: "Smile", label: "Sorriso" },
        { value: "Tongue", label: "Língua" },
        { value: "Twinkle", label: "Brilhante" },
        { value: "Vomit", label: "Vômito" }
      ],
      skinColor: [
        { value: "Tanned", label: "Bronzeado" },
        { value: "Yellow", label: "Amarelo" },
        { value: "Pale", label: "Pálido" },
        { value: "Light", label: "Claro" },
        { value: "Brown", label: "Marrom" },
        { value: "DarkBrown", label: "Marrom Escuro" },
        { value: "Black", label: "Preto" }
      ]
    },
    
    get avatarURL() {
      return generateAvatarURL(this.config);
    },
    
    get sid() {
      return generateSID(this.config);
    },
    
    async init() {
      this.loading = true;
      try {
        // Carrega configuração salva se existir
        const saved = await import("./avataaars.js").then(m => m.loadAvatarConfig());
        if (saved && saved.config) {
          this.config = { ...this.config, ...saved.config };
        }
      } catch (error) {
        console.error("[Avatar Editor] Erro ao inicializar:", error);
      } finally {
        this.loading = false;
      }
    },
    
    selectOption(category, value) {
      this.config[category] = value;
    },
    
    randomize() {
      Object.keys(this.categories).forEach(category => {
        const options = this.categories[category];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        this.config[category] = randomOption.value;
      });
    },
    
    async saveAvatar() {
      this.saving = true;
      try {
        const sid = this.sid;
        const url = this.avatarURL;
        
        // Salva configuração
        await import("./avataaars.js").then(m => m.saveAvatarConfig(this.config, sid));
        
        // Atualiza perfil
        const success = await updateProfileAvatar(sid, url);
        
        if (success) {
          alert("Avatar salvo com sucesso! Seu perfil foi atualizado.");
          window.location.hash = "#perfil";
        } else {
          alert("Erro ao salvar avatar. Tente novamente.");
        }
      } catch (error) {
        console.error("[Avatar Editor] Erro ao salvar:", error);
        alert("Erro ao salvar avatar. Tente novamente.");
      } finally {
        this.saving = false;
      }
    }
  };
};

