<template>
  <div class="home_container" :style="homeStyles">
    <headers></headers>
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
    background-color: #d5d5d5;
  }
</style>
<script>
export default {
  name: 'Home',
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
    Headers: () => import('./parts/Headers.vue')
  }
}
</script>
