<template>
  <div class="headers_container">
    <div class="app_logo_container" @click="goHome">
      <img :src="logo">
    </div>
    <div class="headers_right">
      <top-menu></top-menu>
      <div class="settings_container">
        <Tooltip content="打开或关闭设置 cmd/ctrl + o" placement="bottom-end">
                <Icon type="ios-cog" size="24" @click="goSettings"/>
            </Tooltip>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .headers_container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
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
    max-height: 42px;
    cursor: pointer;
  }
  .app_logo_container img {
    max-height: 42px;
  }
  .headers_right {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .settings_container {
    width: 32px;
    height: 65px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .settings_container i {
    width: 32px;
      height: 65px;
      line-height: 65px;
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
        name: 'home'
      })
    },
    goSettings () {
      this.$router.replace({
        name: 'settings'
      })
    }
  },
  components: {
    TopMenu: () => import('./TopMenu.vue')
  }
}
</script>
