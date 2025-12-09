<script>
import Header from './components/AppHeader.vue'
import AppCart from './components/AppCart.vue'

export default {
  name: 'App',
  components: {
    Header,
    AppCart,
  }
}
</script>

<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin-top: 24px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
