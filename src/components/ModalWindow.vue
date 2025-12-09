<script>
import {store} from '@/store/store'

export default {
  name: "ModalWindow",
  props: {
    errors: {
      type: Array
    }
  },
  methods: {
    closeModal() {
      store.modalVisible = !store.modalVisible
    }
  }
}
</script>

<template>
  <div class="modal">
    <button @click="closeModal">Назад</button>
    <p v-for="error in this.errors">{{ error }}</p>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  background-color: white;
  border: 1px solid black;
  z-index: 1;
  height: 25%;
  width: 30%;

  display: flex;
  flex-direction: column;
  gap: 12px
}
</style>