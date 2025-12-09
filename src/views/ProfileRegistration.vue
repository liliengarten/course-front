<script>
import {baseUrl} from '@/main.js'
import {store} from '@/store/store'
import loginForm from "@/views/ProfileLoginForm.vue";
import router from "@/router";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "RegistrationForm",
  components: {ModalWindow},
  data() {
    return {
      name: '',
      surname: '',
      patronymic: '',
      email: '',
      password: '',
      errors: [],
      store,
    }
  },
  methods: {
    async attemptRegistration() {
      this.validateRegistration()

      if (this.errors.length > 0) {
        store.modalVisible = true
        return
      }

      const res = await fetch(baseUrl + '/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "fio": `${this.surname} ${this.name} ${this.patronymic}`,
          "email": this.email,
          "password": this.password
        })
      })

      let response = await res.json()

      if (response.errors) {
        this.errors.push("Данный email уже занят.")
        store.modalVisible = true
        return
      }

      store.setUserToken(response.data.user_token)
      await router.push('/')
    },
    validateRegistration() {
      this.errors = [];
      const latin = /[a-zA-Z]/;
      const nonChars = /[1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      let fio = this.name + this.surname + this.patronymic;
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      let specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '.']

      let fioContainsLatin = false;
      let fioContainsNumbers = false;
      let fioContainsSpecialChars = false;
      let passwordContainsNumbers = false;
      let passwordContainsSpecialChars = false;

      if (latin.test(fio)) {
        fioContainsLatin = true
      }

      if (nonChars.test(fio)) {
        fioContainsNumbers = true;
        fioContainsSpecialChars = true;
      }
      // for (let number of numbers) {
      //   if (fio.includes(number)) {
      //     fioContainsNumbers = true;
      //     break;
      //   }
      // }
      //
      // if (!fioContainsLatin) {
      //   for (let char of specialChars) {
      //     if (fio.includes(char)) {
      //       fioContainsSpecialChars = true;
      //       break;
      //     }
      //   }
      // }

      for (let number of numbers) {
        if (this.password.includes(number)) {
          passwordContainsNumbers = true;
          break;
        }
      }

      for (let char of specialChars) {
        if (this.password.includes(char)) {
          passwordContainsSpecialChars = true;
          break;
        }
      }

      if (fioContainsLatin || fioContainsNumbers || fioContainsSpecialChars) this.errors.push("Поля имени, фамилии и отчества должны содержать только кириллицу.")
      if (!passwordContainsNumbers) this.errors.push("Пароль должен содержать цифры.")
      if (!passwordContainsSpecialChars) this.errors.push("Пароль должен содержать специальные символы. [! @ # $ % ^ & * ( ) _ + - .]")
      if (this.password.length < 8) this.errors.push("Длина пароля должна быть не менее 8 символов.")
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="attemptRegistration">
      <div class="fields">
        <div>
          <p>Фамилия</p>
          <input name="surname" required type="text" v-model="surname">
          <p>Имя</p>
          <input name="name" required type="text" v-model="name">
          <p>Отчество</p>
          <input name="patronymic" required type="text" v-model="patronymic">
        </div>
        <div>
          <p>Email</p>
          <input name="email" required type="email" v-model="email">
          <p>Пароль</p>
          <input name="password" required type="password" v-model="password">
        </div>
      </div>

      <button>Зарегистрироваться</button>

      <div>
        <p>Уже есть профиль?</p>
        <router-link to="/login"><span>Войти</span></router-link>
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

.fields {
  display: flex;
}

.fields div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: start;
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