// Modal de evidência de missão

function modalEvidencia() {
  return {
    mostrar: false,
    missaoSelecionada: null,
    tipoEvidencia: 'texto',
    evidenciaTexto: '',
    evidenciaImagem: null,
    evidenciaAudio: null,
    gravando: false,
    mediaRecorder: null,
    audioChunks: [],
    
    init() {
      // Escutar evento para abrir modal
      window.addEventListener('abrir-modal-evidencia', (e) => {
        this.missaoSelecionada = e.detail.missao;
        this.mostrar = true;
        this.resetar();
      });
    },
    
    resetar() {
      this.tipoEvidencia = 'texto';
      this.evidenciaTexto = '';
      this.evidenciaImagem = null;
      this.evidenciaAudio = null;
      this.gravando = false;
    },
    
    fechar() {
      this.mostrar = false;
      this.resetar();
    },
    
    podeSubmeter() {
      if (this.tipoEvidencia === 'texto') {
        return this.evidenciaTexto.trim().length > 0;
      }
      if (this.tipoEvidencia === 'imagem') {
        return this.evidenciaImagem !== null;
      }
      if (this.tipoEvidencia === 'audio') {
        return this.evidenciaAudio !== null;
      }
      return false;
    },
    
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.evidenciaImagem = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    
    async toggleGravacao() {
      if (this.gravando) {
        this.pararGravacao();
      } else {
        await this.iniciarGravacao();
      }
    },
    
    async iniciarGravacao() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
        
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.evidenciaAudio = URL.createObjectURL(audioBlob);
        };
        
        this.mediaRecorder.start();
        this.gravando = true;
      } catch (error) {
        Utils.showToast('Erro ao acessar microfone. Verifique as permissões.', 'error');
        console.error('Erro ao gravar áudio:', error);
      }
    },
    
    pararGravacao() {
      if (this.mediaRecorder && this.gravando) {
        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        this.gravando = false;
      }
    },
    
    async submeterEvidencia() {
      if (!this.podeSubmeter()) {
        Utils.showToast('Preencha a evidência antes de submeter!', 'warning');
        return;
      }
      
      const user = Alpine.store('app').currentUser;
      if (!user || !this.missaoSelecionada) return;
      
      const evidencia = {
        tipo: this.tipoEvidencia,
        conteudo: this.tipoEvidencia === 'texto' ? this.evidenciaTexto : 
                  this.tipoEvidencia === 'imagem' ? this.evidenciaImagem :
                  this.evidenciaAudio
      };
      
      const sucesso = await MissoesSystem.registrarEvidencia(user.id, this.missaoSelecionada.id, evidencia);
      
      if (sucesso) {
        Utils.showToast('Evidência registrada! Aguardando verificação...', 'success');
        Utils.playSound('confirm');
        this.fechar();
        
        // Auto-verificar e concluir (em produção seria manual)
        setTimeout(async () => {
          await MissoesSystem.concluirMissao(user.id, this.missaoSelecionada.id, true);
          const status = await DataManager.getUserStatus(user.id);
          Alpine.store('app').statusData = status;
          
          // Recarregar tela de missões
          window.dispatchEvent(new CustomEvent('recarregar-missoes'));
        }, 1000);
      }
    }
  };
}

