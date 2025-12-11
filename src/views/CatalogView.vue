<script>
import CatalogCard from '@/components/CatalogCard.vue'
import Catalog from "@/components/CatalogCard.vue";
import AppCart from "@/components/AppCart.vue";
import { store } from '@/store/store'
import { baseUrl } from '@/main.js'

export default {
  name: "CatalogView",
  components: {
    Catalog,
    CatalogCard,
    AppCart,
  },
  data() {
    return {
      store,
    }
  },
  mounted() {
    store.requestProducts()
  }
}
</script>

<template>
  <div class="catalogWrapper">
    <AppCart v-if="store.cartVisible"></AppCart>

    <CatalogCard v-for="product in store.catalog"
          :product-id="product.id"
          :productName="product.name"
          :productImage="'http://127.0.0.1/' + product.image"
          :productDescription="product.description"
          :productPrice="product.price">
    </CatalogCard>
  </div>
</template>

<style scoped>
  .catalogWrapper {
    width: 90%;
    margin: 0 auto;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-block: 5%;
    gap: 24px;

    align-items: center;
    justify-items: center;
  }
</style>