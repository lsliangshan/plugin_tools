<template>
  <div class="blank_container"
       :style="blankContainerStyles">
    <div class="default_blank"
         key="defaultBlank"
         v-if="blankHomePage === 'default'">
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="without_login"
             v-if="!loginInfo.phonenum">
          <img src="/static/images/new_logo.png">&trade;
        </div>
      </transition>
      <transition name="with-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="with_login"
             v-if="loginInfo.phonenum">
          <waterfall :imgsArr="list"
                     src-key="url"
                     @scrollReachBottom="getGankData">
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
          </waterfall>
        </div>
      </transition>
    </div>
    <div class="custom_blank"
         key="customBlank"
         v-else>
      <iframe :src="blankHomePage"
              frameborder="0"></iframe>
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
}

.custom_blank {
  width: 100%;
  height: 100%;
}
.custom_blank iframe {
  border: none;
  width: 100%;
  height: 100%;
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
export default {
  name: 'Blank',
  components: {
    Waterfall: () => import('vue-waterfall-easy')
  },
  data () {
    return {
      list: [],
      formInfo: {
        category: '福利',
        pageSize: 10,
        pageIndex: 1
      }
    }
  },
  computed: {
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
    }
  },
  async created () {
    await this.getGankData()
  },
  methods: {
    async getGankData () {
      await this.$store.dispatch(types.AJAX, {
        url: this.requestInfo.getGankData,
        data: Object.assign({}, this.formInfo, {
          phonenum: this.loginInfo.phonenum,
          token: this.loginInfo.token
        })
      }).catch(err => {
        this.$Message.error(err.message || '请求失败，请稍后再试')
      }).then(responseData => {
        if (responseData.status === 200) {
          if (this.formInfo.pageIndex === 1) {
            this.list = responseData.data.list
          } else {
            this.list = this.list.concat(responseData.data.list)
            this.$Message.success('新增' + responseData.data.count + '条')
          }
          this.formInfo.pageIndex = this.formInfo.pageIndex + 1
        }
      })
    }
  }
}
</script>