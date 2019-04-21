<template>
  <div class="blank_container"
       :style="blankContainerStyles">
    <div class="default_blank"
         key="defaultBlank"
         v-if="settings.blankHomePage === 'default'">
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="without_login"
             v-if="true">
          <!-- v-if="!loginInfo.phonenum"> -->
          <img src="/static/images/new_logo.png">&trade;
        </div>
      </transition>
      <transition name="with-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="with_login"
             v-if="false">
          <!-- <weather></weather> -->
          <!-- <waterfall :imgsArr="images[imageCategories[activeImageCategoryIndex].value].list"
                     src-key="url"
                     ref="waterfall"
                     :maxCols="8"
                     @scrollReachBottom="getGankData"
                     @imgError="imgError"
                     preview="gallery"
                     preview-text="">
            <div slot="waterfall-head"
                 class="waterfall_header">
              <div class="waterfall_header_inner">
                <div class="waterfall_category_item"
                     v-for="(item, index) in imageCategories"
                     :key="item.value"
                     :style="[activeImageCategoryIndex == index ? activeCategoryItemStyles : {}]"
                     @click="setActiveCategoryItem(index)">
                  <span>{{item.label}}</span>
                </div>
              </div>
            </div>
            <div slot="loading"
                 slot-scope="{isFirstLoad}">
              <div slot="loading"
                   v-if="isFirstLoad">
                <Spin size="large"></Spin>
              </div>
              <div v-else>
                <Spin size="large"></Spin>
              </div>
            </div>
          </waterfall> -->
        </div>
      </transition>
    </div>
    <div class="custom_blank"
         key="customBlank"
         v-else>
      <iframe :src="settings.blankHomePage"
              ref="iframeRef"
              @load="iframeLoaded"
              frameborder="0"></iframe>
      <transition name="iframe-loading-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <div class="iframe_loading"
             v-if="iframeLoading">
          <Spin></Spin>
        </div>
      </transition>
    </div>
  </div>
</template>
<style scoped>
.blank_container {
  width: 100%;
  height: 100%;
}
.default_blank {
  width: 100%;
  height: 100%;
}
.without_login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: rgb(79, 192, 141);
  pointer-events: none;
}
.without_login img {
  max-height: 40px;
}

.with_login {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.custom_blank {
  position: relative;
  width: 100%;
  height: 100%;
}
.custom_blank iframe {
  border: none;
  width: 100%;
  height: 100%;
}
.iframe_loading {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #ffffff;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.waterfall_header {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 999;
  height: 48px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.waterfall_header_inner {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.waterfall_category_item {
  padding: 0 8px;
  height: 48px;
  color: #333;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.waterfall_category_item:hover,
.waterfall_category_item:active {
  background-color: #f5f5f5;
}
.waterfall_category_item.active {
}
.welfare_item {
  /* margin-bottom: 5px; */
}
.welfare_item img {
  max-width: 200px;
}
</style>
<script>
import * as types from '../../store/mutation-types'
import { createNamespacedHelpers, mapGetters } from 'vuex'
const { mapActions } = createNamespacedHelpers('./store/modules')
export default {
  name: 'Blank',
  components: {
    Waterfall: () => import('vue-waterfall-easy'),
    Weather: () => import('./Weather.vue')
  },
  data () {
    return {
      list: [],
      formInfo: {
        // category: 1,
        pageSize: 30,
        pageIndex: 1
      },
      imageCategories: [
        {
          label: '每日精选',
          value: 1
        },
        {
          label: '游戏',
          value: 5
        },
        {
          label: '美女',
          value: 6
        },
        {
          label: '风景',
          value: 9
        },
        {
          label: '视觉创意',
          value: 10
        },
        {
          label: '明星影视',
          value: 11
        },
        {
          label: '汽车',
          value: 12
        },
        {
          label: '萌宠动物',
          value: 14
        },
        {
          label: '小清新',
          value: 15
        },
        {
          label: '体育',
          value: 16
        },
        {
          label: '军事',
          value: 22
        },
        {
          label: '动漫卡通',
          value: 26
        },
        {
          label: '情感',
          value: 30
        },
        {
          label: '文字',
          value: 35
        }
      ],
      images: {},
      activeImageCategoryIndex: 0,
      iframeLoading: false
    }
  },
  computed: {
    ...mapGetters({
      settings: 'moduleSettings/settings',
      themeImage: 'moduleSettings/themeImage',
      // blankHomePage: 'moduleSettings/blankHomePage',
      // activeThemeIndex: 'moduleSettings/activeThemeIndex'
    }),
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    blankContainerStyles () {
      return {
        height: this.bodyStyles.height + 'px'
      }
    },
    blankHomePage () {
      return this.$store.state.blankHomePage
    },
    loginInfo () {
      return this.$store.state.loginInfo
    },
    requestInfo () {
      return this.$store.state.requestInfo
    },
    themeColor () {
      return this.$store.state.themeColor
    },
    activeCategoryItemStyles () {
      return {
        backgroundColor: this.themeColor,
        color: '#ffffff'
      }
    }
  },
  async created () {
    // await this.getGankData()
    if (this.settings.blankHomePage !== 'default') {
      this.iframeLoading = true
    }
  },
  mounted () {
  },
  methods: {
    iframeLoaded (e) {
      this.iframeLoading = false
    },
    getGankData () {
      return new Promise(async (resolve) => {
        let _category = this.imageCategories[this.activeImageCategoryIndex].value
        if (!this.images[_category]) {
          this.images[_category] = {
            list: [],
            pageIndex: this.formInfo.pageIndex,
            pageSize: this.formInfo.pageSize
          }
          await this.$store.dispatch(types.AJAX, {
            url: this.requestInfo.getWrapper,
            data: {
              phonenum: this.loginInfo.phonenum,
              token: this.loginInfo.token,
              category: _category,
              pageIndex: this.images[_category].pageIndex,
              pageSize: this.images[_category].pageSize
            }
          }).catch(err => {
            this.$Message.error(err.message || '请求失败，请稍后再试')
            resolve(true)
          }).then(responseData => {
            if (responseData && responseData.status === 200) {
              if (Number(this.images[_category].pageSize) * Number(this.images[_category].pageIndex) > Number(responseData.data.totalCount)) {
                this.$refs.waterfall.waterfallOver()
                this.$Message.info('已经加载完了')
              } else {
                if (this.images[_category].pageIndex === 1) {
                  this.images[_category].list = responseData.data.list
                  // this.list = responseData.data.list
                } else {
                  this.images[_category].list = this.images[_category].list.concat(responseData.data.list)
                  // this.list = this.list.concat(responseData.data.list)
                  this.$Message.destroy()
                  this.$Message.success('新增' + responseData.data.count + '条')
                }
                this.images[_category].pageIndex = this.images[_category].pageIndex + 1
              }
            }
            resolve(true)
          })
        } else {
          resolve(true)
        }
      })
    },
    findIndexByUrl (url) {
      let list = this.list
      let outIndex = -1
      let i = 0
      for (i; i < list.length; i++) {
        if (list[i].url === url) {
          outIndex = i
          i = list.length
        }
      }
      return outIndex
    },
    imgError (e) {
      // let _index = this.findIndexByUrl(e.url)
      // if (_index > -1) {
      //   setTimeout(() => {
      //     this.list.splice(_index, 1)
      //   }, 500)
      // }
    },
    setActiveCategoryItem (index) {
      this.activeImageCategoryIndex = Number(index)
    }
  },
  watch: {
    'activeImageCategoryIndex' (val) {
      if (val > -1) {
        this.getGankData()
      }
    }
  }
}
</script>