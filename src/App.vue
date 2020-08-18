<template>
  <div id="app">
    <router-view name="header" />
    <router-view class="root-content" />
    <router-view name="footer" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  min-height: 100vh;
  background-color: #F2F6FC;
}
</style>