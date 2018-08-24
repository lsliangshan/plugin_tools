<template>
  <div class="headers_container">
    <div class="app_logo_container" @click="goHome">
      <img :src="logo">
    </div>
    <top-menu></top-menu>
  </div>
</template>
<style scoped>
  .headers_container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    /*background-color: #424242;*/
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 1px -3px rgba(0,0,0,.2), 0 1px 1px 1px rgba(0,0,0,.14), 0 1px 18px 1px rgba(0,0,0,.12);
  }
  .app_logo_container {
    max-height: 54px;
    cursor: pointer;
  }
  .app_logo_container img {
    max-height: 54px;
  }
</style>
<script>
export default {
  name: 'Headers',
  data () {
    return {}
  },
  computed: {
    logo () {
      return this.$store.state.logo
    }
  },
  methods: {
    goHome () {
      this.$router.replace({
        name: 'Home'
      })
    }
  },
  components: {
    TopMenu: () => import('./TopMenu.vue')
  }
}
</script>
