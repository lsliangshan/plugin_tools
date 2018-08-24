<template>
  <div class="main_container" :style="mainContainerStyles">
    <router-view name="ContentRouter"></router-view>
  </div>
</template>

<style scoped>
  .main_container {
    width: 100%;
    padding-top: 65px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
</style>

<script>
  export default {
    name: 'MainContent',
    data () {
      return {}
    },
    computed: {
      mainContainerStyles () {
        let bodyStyles = this.$store.state.bodyStyles
        return {
          minHeight: bodyStyles.height + 'px'
        }
      }
    }
  }
</script>
