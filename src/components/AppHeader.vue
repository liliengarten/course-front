<script>
import { store } from '@/store/store.js'
import { baseUrl } from "@/main.js";
import router from "@/router"

export default {
  name: "Header",
  data() {
    return {
      store,
    }
  },
  methods: {
    async logout() {
      try {
        const res = await fetch(baseUrl + "/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
          }
        })

        if (!res.ok) throw 'something went wrong :('

        if (this.$route.path !== '/catalog') router.push('/catalog')
        if (store.cartVisible) store.changeCartVisibility()

        store.setUserToken('')
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<template>
  <header>
    <router-link to="/">Каталог</router-link>

    <div>
      <router-link v-show="store.userToken" to="/orders">Заказы</router-link>
      <a v-show="store.userToken && this.$route.path === '/catalog'" @click="store.changeCartVisibility()">Корзина</a>
      <router-link v-show="!store.userToken" to="/registration">Профиль</router-link>
      <a v-show="store.userToken" @click="logout">Выйти</a>
    </div>
  </header>
</template>

<style scoped>
  a {
    text-decoration: none;
    color: black;
    cursor: pointer;

    background-color: aliceblue;
    padding: 8px;
    border-radius: 4px;

    transition: .5s;
  }

  a:hover {
    translate: 0 3px;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    padding: 24px;
    box-shadow: 0 1px 0 #2c3e50;

    width: 40%;
    margin: 0 auto;
  }

  div {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  header a.router-link-exact-active {
    color: #42b983;
  }
</style>