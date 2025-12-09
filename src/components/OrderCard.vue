<script>
import CartCard from "./CartCard.vue";
import { store } from "@/store/store.js"
import CatalogCard from "@/components/CatalogCard.vue";

export default {
  name: "OrderCard",
  components: {
    CatalogCard,
    CartCard
  },
  mounted() {
    this.setDetailedProducts()
  },
  methods: {
    setDetailedProducts() {
      for (let catalogProduct of store.catalog) {
        if (this.orderProducts.includes(catalogProduct.id)) {
          this.products.push(catalogProduct)
        }
      }

    }
  },
  data() {
    return {
      store,
      products: [],
    }
  },
  props: {
    orderId: Number,
    orderProducts: Array,
    orderPrice: Number
  }
}
</script>

<template>
  <div class="orderWrapper">
    <div class="orderInfo">
      <p>Заказ #{{orderId}}</p>
      <p>Итого: {{orderPrice}}$</p>
    </div>
    <div class="orderItems">
      <CartCard v-for="product in products" :key="product.id"
                :productId="product.id"
                :productName="product.name"
                :productImage="'http://lifestealer86.ru' + '/' + product.image"
                :productPrice="product.price"
                :productQuantity="product.quantity"
      ></CartCard>
    </div>
  </div>
</template>

<style scoped>
  .orderWrapper {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .orderInfo {
    display: flex;
    justify-content: space-between;
  }

  .orderItems {
    display: flex;
    flex-direction: column;
    gap: 4%;
  }

  p {
    text-align: left;
  }
</style>