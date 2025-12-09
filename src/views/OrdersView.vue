or<script>
import { baseUrl } from '@/main.js';
import OrderCard from "@/components/OrderCard.vue";

export default {
  name: "OrdersView",
  components: {OrderCard},
  data() {
    return {
      orders: {},
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      try {
        const res = await fetch(baseUrl + "/order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
          }
        })

        if (!res.ok) throw 'something went wrong :('

        const { data } = await res.json()
        this.orders = data
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <div class="orders">
    <OrderCard v-for="order in orders" :key="order.id"
               :orderId="order.id"
               :orderProducts="order.products"
               :orderPrice="order.order_price"
    ></OrderCard>
  </div>
</template>

<style scoped>
.orders {
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 100vh;
  margin: auto;
}
</style>