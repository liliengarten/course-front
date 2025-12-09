<script>
import {baseUrl} from "@/main";
import {store} from "@/store/store"
import router from "@/router"

export default {
  name: "Catalog",
  props: {
    productId: Number,
    productName: String,
    productImage: String,
    productDescription: String,
    productPrice: Number
  },
  data() {
    return {
      quantity: 0,
    }
  },
  methods: {
    async addToCart() {
      if (!store.userToken) {
        router.push('/registration')
        return
      }

      let found = false

      for (let product of store.visibleCart) {
        if (product.id === this.productId) {
          product.quantity++;
          found = true
        }
      }

      if (!found) {
        let item = {
          id: this.productId,
          name: this.productName,
          image: this.productImage,
          price: this.productPrice,
          quantity: 1
        }

        store.visibleCart.push(item)
      }

      try {
        const res = await fetch(baseUrl + '/cart/' + this.productId, {
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
    },
    async removeFromCart() {
      await store.requestCart();
      for (let product of store.visibleCart) {
        if (product.id === this.productId) {
            if (product.quantity === 1) store.visibleCart.splice(store.visibleCart.indexOf(product), 1)
            else product.quantity--
        }
      }

      let toDelete = 0;

      for (let item of store.cart) {
        if (item.product_id === this.productId) {
          toDelete = item.id
        }
      }

      try {
        const res = await fetch(baseUrl + '/cart/' + cartItemId, {
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
    }
  }
}
</script>

<template>
  <div name="catalogCard" class="wrapper">
    <div class="wrapImg">
      <img :src="productImage" alt="product image">
    </div>

    <div class="productInfo">
      <p>{{ productName }}</p>
      <p>{{ productDescription }}</p>
      <p>{{ productPrice }}</p>
    </div>

    <div class="buyPanel">
      <button class="plus" @click="removeFromCart">-</button>
      <button class="minus" @click="addToCart">+</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 24px;
  width: 320px;
  height: 480px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3%;

  border: 1px solid black;
  border-radius: 8px;
}

.wrapImg {
  min-height: 200px;
  max-width: 200px;
}

img {
  object-fit: cover;
  width: 100%;
  height: auto;
}

.productInfo {
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  cursor: pointer;
}

.buyPanel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 40px;
}

.addToCart {
  padding: 8px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 4px;

  min-height: 40px;
}

.plus {
  padding: 8px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 4px;

  min-height: 20px;
  min-width: 20px;
}

.minus {
  padding: 8px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 4px;

  min-height: 20px;
  min-width: 20px;
}
</style>