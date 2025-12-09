<script>
import {store} from "@/store/store";
import router from "@/router";
import {baseUrl} from "@/main";

export default {
  name: "cartCard",
  props: {
    product: Object,
  },
  methods: {
    async removeFromCart() {
      for (let product of store.visibleCart) {
        if (product.id === this.product.id) {
          if (product.quantity === 1) store.visibleCart.splice(store.visibleCart.indexOf(product), 1)
          else product.quantity--
        }
      }

      await store.requestCart();

      try {
        let toDelete = 0;

        store.cart.forEach((item) => {
          if (item.product_id === this.product.id) {
            toDelete = item.id;
          }
        })

        const res = await fetch(baseUrl + '/cart/' + toDelete, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
          }
        })

        if (!res.ok) throw 'something went wrong :(';
      } catch (err) {
        console.log(err)
      }
    },
    async addToCart() {
      for (let product of store.visibleCart) {
        if (product.id === this.product.id) {
          product.quantity++
        }
      }

      try {
        const res = await fetch(baseUrl + '/cart/' + this.product.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
          }
        })

        if (!res.ok) throw 'something went wrong :(';
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <div class="wrapper cartItem">
    <img :src="product.image" alt="product image">

    <div class="productInfo">
      <p>{{ product.name }}</p>
      <p>{{ product.price }}</p>
      <p>{{ product.quantity }}</p>
    </div>

    <div>
      <button @click="removeFromCart">-</button>
      <button @click="addToCart">+</button>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  min-width: 300px;
  max-width: 300px;

  border: 1px solid black;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.productInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
img {
  width: 120px;
  height: 120px;
}
</style>