<template>
  <div class="headers_container"
       :style="headersContainerStyles">
    <div class="app_logo_container"
         @click="goHome">
      <img :src="logo">
    </div>
    <transition name="music-search-transition"
                enter-active-class="animated fadeIn faster"
                leave-active-class="animated fadeOut faster">
      <div class="music_search_container"
           v-if="showAudio">
        <Input prefix="ios-search"
               placeholder="搜索音乐"
               style="width: auto"
               v-model="searchMusicKey"
               @on-enter="searchMusic" />
      </div>
    </transition>
    <div class="headers_right">
      <top-menu></top-menu>
      <div class="settings_container">
        <Tooltip content="打开设置 cmd/ctrl + o"
                 placement="bottom-end">
          <Icon type="ios-cog"
                size="24"
                @click="goSettings"
                :style="settingsContainerStyles" />
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
  /*background-color: #ffffff;*/
  /*background-color: #424242;*/
  padding: 0 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  /*box-shadow: 0 1px 1px -3px rgba(0,0,0,.2), 0 1px 1px 1px rgba(0,0,0,.14), 0 1px 18px 1px rgba(0,0,0,.12);*/
}
.app_logo_container {
  max-height: 42px;
  cursor: pointer;
}
.app_logo_container img {
  max-height: 42px;
}
.music_search_container {
  width: 200px;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  color: #ffffff;
}
</style>
<script>
export default {
  name: 'Headers',
  data () {
    return {
      searchMusicKey: ''
    }
  },
  computed: {
    logo () {
      return this.$store.state.logo
    },
    activeThemeIndex () {
      return this.$store.state.activeThemeIndex
    },
    headersContainerStyles () {
      return {
        backgroundColor: (this.activeThemeIndex.join(';').indexOf('-1') > -1 ? '#FFFFFF' : 'transparent')
      }
    },
    settingsContainerStyles () {
      return {
        color: (this.activeThemeIndex.join(';').indexOf('-1') > -1 ? '#515a6e' : '#FFFFFF')
      }
    },
    showAudio () {
      return this.$store.state.showAudio
    }
  },
  methods: {
    goHome () {
      this.$router.replace({
        name: 'index'
      })
    },
    goSettings () {
      this.$router.replace({
        name: 'settings'
      })
    },
    searchMusic () {
      this.$router.push({
        name: 'search.m',
        query: {
          s: this.searchMusicKey
        }
      })
      // return new Promise(async (resolve) => {
      //   let searchMusicData = await this.$store.dispatch('moduleNem/searchMusic', {
      //     s: this.searchMusicKey
      //   })
      //   resolve(searchMusicData)
      // })
    }
  },
  components: {
    TopMenu: () => import('./TopMenu.vue')
  }
}
</script>
