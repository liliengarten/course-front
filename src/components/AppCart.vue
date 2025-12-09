<script>
import CartCard from './CartCard.vue'
import {baseUrl} from '@/main.js'
import {store} from '@/store/store.js'

export default {
  name: "AppCart",
  components: {
    CartCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    async placeOrder() {
      store.clearVisibleCart()

      try {
        const res = await fetch(baseUrl + '/order', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
          }
        })

        if (!res.ok) throw "something went wrong :("
        store.requestCart()
      } catch (err) {
        console.log(err)
      }
    },
    async clearCart() {
      await store.requestCart()
      store.clearVisibleCart()

      try {
        for (let item of store.cart) {
          const res = await fetch(baseUrl + '/cart/' + item.id, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("userToken")}`
            }
          })

          if (!res.ok) throw "something went wrong :("
          store.requestCart()
        }
      } catch(err) {
        console.log(err)
      }
    }
  },
  async mounted() {
    await store.requestCart()
  }
}
</script>

<template>
  <div class="cartWrapper">
    <div class="topPart">
      <button class="closeButton" @click="store.changeCartVisibility()">x</button>
      <p>Корзина</p>
    </div>

    <button @click="clearCart">Очистить корзину</button>

    <div class="items">
      <CartCard v-for="product in store.visibleCart" :key="product.id"
                :product="product"
      ></CartCard>
    </div>

    <button class="placeOrder" @click="placeOrder">Оформить заказ</button>
  </div>
</template>

<style scoped>
.cartWrapper {
  position: fixed;
  width: 400px;
  top: 0;
  bottom: 0;
  left: calc(100% - 400px);

  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border: 1px solid black;
}

.topPart {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  margin-bottom: 15%;
}

.items {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  gap: 5%;
}

.closeButton {
  position: absolute;
  left: 0;
}

.placeOrder {
  width: 200px;
  padding: 12px;
}
</style>