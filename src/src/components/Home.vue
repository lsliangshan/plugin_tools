<template>
  <div class="home_container"
       :style="homeStyles">
    <!-- <div v-if="$route.name === 'home'"
         class="home"
         :style="homeStyles">
      <greeting></greeting>
    </div> -->
    <div class="main_content"
         key="otherRouter"
         :style="mainContentStyles">
      <headers></headers>
      <main-content></main-content>
    </div>
    <cmd></cmd>
  </div>
</template>
<style scoped>
.home_container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  /*background-color: #d5d5d5;*/
}
.main_content {
  position: sticky;
  width: 100%;
  left: 0;
  top: 0;
  /*background-image: url(/html/static/images/themes/bg.jpg);*/
  background-attachment: fixed;
  background-size: cover;
  /*background-size: 100% 100%;*/
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f2f2f2;
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
import * as types from '../store/mutation-types'
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
    },
    themeImages () {
      return this.$store.state.themeImages
    },
    activeThemeIndex () {
      return this.$store.state.activeThemeIndex
    },
    mainContentStyles () {
      let first = Math.min(this.activeThemeIndex[0], this.themeImages.length - 1)
      let second = Math.min(this.activeThemeIndex[1], this.themeImages[first] ? this.themeImages[first].sublist.length - 1 : -1)
      this.$store.commit(types.SET_ACTIVE_THEME_INDEX, {
        activeThemeIndex: [first, second]
      })
      return {
        backgroundImage: (this.activeThemeIndex.join(';').indexOf('-1') < 0 ? 'url(' + this.themeImages[first].sublist[second].img + ')' : '')
      }
    }
  },
  mounted () {
    this.$router.replace({
      name: 'index'
    })
  },
  components: {
    Greeting: () => import('./Greeting.vue'),
    Headers: () => import('./parts/Headers.vue'),
    MainContent: () => import('./parts/MainContent.vue'),
    Cmd: () => import('./tool/Cmd.vue')
  }
}
</script>
