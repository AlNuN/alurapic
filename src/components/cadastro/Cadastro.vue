<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input 
          v-validate
          name="titulo"
          data-vv-rules="required|min:3|max:30"
          data-vv-as="Título"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
        >
        <span v-show="errors.has('titulo')" class="erro" >{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input 
          v-validate
          name="url"
          data-vv-rules="required"
          id="url"
          autocomplete="off"
          v-model="foto.url"
        >
        <span v-show="errors.has('url')" class="erro">{{ errors.first('url') }}</span>
        <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-show="foto.url" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
      return {
          foto: new Foto(),
          id: this.$route.params.id,
      };
  },

  created() {
    this.service = new FotoService(this.$resource);

    if(this.id) {
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
    }
  },

  methods: {
      grava() {
          this.$validator
            .validateAll()
            .then((sucess) => {
              if (sucess) {
                this.service
                  .cadastra(this.foto)
                  .then(() => 
                    this.id
                      ? this.$router.push({ name: 'home' })
                      : this.foto = new Foto(),
                    (err) => console.error(err));
              }
            });
      }
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro{
    color: red;
  }

</style>
