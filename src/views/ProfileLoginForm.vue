<script>
import {baseUrl} from '@/main.js'
import {store} from '@/store/store.js'
import router from "@/router";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "RegistrationForm",
  components: {ModalWindow},
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      errors: [],

      store,
    }
  },
  methods: {
    async attemptLogin() {
      const res = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": this.email,
          "password": this.password
        })
      })

      this.errors = [];
      let response = await res.json()

      if (response.error) {
        this.errors.push('Неверные логин или пароль.')
        store.modalVisible = true;
        return
      }

      store.setUserToken(response.data.user_token)
      await router.push('/')
    }
  },
}
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="attemptLogin">
      <p>Email</p>
      <input name="email" required type="email" v-model="email">
      <p>Пароль</p>
      <input name="password" required type="password" v-model="password">
      <button>Войти</button>

      <div>
        <p>Нет профиля?</p>
        <router-link to="/registration"><span>Зарегистрироваться</span></router-link>
      </div>
    </form>
    <modal-window :errors="errors" v-show="store.modalVisible"></modal-window>
  </div>
</template>

<style scoped>
.wrapper {
  height: calc(100vh - 66px);
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

div:last-child {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

form {
  width: 25vw;
  margin: auto;

  display: flex;
  flex-direction: column;
}

form p {
  font-weight: 550;
}

input {
  padding: 12px;
  border: 1px solid black;
  border-radius: 4px;
}

p {
  text-align: left;
}

button {
  cursor: pointer;
  margin-top: 5%;

  padding: 12px;
  border-radius: 8px;
  border: none;

  color: white;
  background-color: #42b983;
}

span, a {
  color: #42b983;
  text-decoration: none;
}
</style>