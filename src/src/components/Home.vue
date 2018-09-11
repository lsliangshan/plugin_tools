<template>
  <div class="home_container" :style="homeStyles">
    <div v-if="$route.name === 'home'" class="home" :style="homeStyles">
      <greeting></greeting>
    </div>
    <div key="otherRouter" v-else>
      <headers></headers>
    <main-content></main-content>
    </div>  
    <cmd></cmd>
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
    background-color: #d5d5d5;
  }
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    homeStyles () {
      return {
        minHeight: this.$store.state.bodyStyles.height + 'px'
      }
    }
  },
  components: {
    Greeting: () => import('./Greeting.vue'),
    Headers: () => import('./parts/Headers.vue'),
    MainContent: () => import('./parts/MainContent.vue'),
    Cmd: () => import('./tool/Cmd.vue')
  }
}
</script>
