<template>
  <transition name="router-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
    <div class="login_container"
         @keyup.13="login">
      <div class="login_wrapper"
           :style="mainContentStyles">
        <draggable class="login_box"
                   :w="320"
                   :h="273"
                   :x="100"
                   :y="(bodyStyles.height - 273) / 2">
          <Card :bordered="false"
                :dis-hover="true"
                class="login_card">
            <p slot="title"
               style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
              <span v-text="'登录 ' + appName"></span>
              <Icon type="ios-move"
                    size="18" />
            </p>
            <Form :ref="formRef"
                  :model="formItems"
                  :rules="formRules">
              <FormItem prop="user">
                <Input type="text"
                       v-model="formItems.user"
                       placeholder="用户名或手机号">
                <Icon type="ios-person-outline"
                      slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password"
                       v-model="formItems.password"
                       placeholder="密码">
                <Icon type="ios-lock-outline"
                      slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary"
                        :loading="isLoggingIn"
                        long
                        @click="login">
                  <span v-if="!isLoggingIn">登录</span>
                  <span v-else>登录中</span>
                </Button>
              </FormItem>
            </Form>
            <div class="login_bar">
              <!-- <router-link to="/register">
                    <span>忘记密码</span>
                  </router-link> -->
              <router-link to="/register">
                <span class="login_register_tip">注册</span>
              </router-link>
            </div>
          </Card>
        </draggable>
      </div>
    </div>
  </transition>
</template>
<style scoped>
  .login_container {
    width: 100%;
    height: 100%;
  }
  .login_wrapper {
    width: 100%;
    height: 100%;
    position: sticky;
    left: 0;
    top: 0;
    /*background-image: url(/html/static/images/themes/bg.jpg);*/
    background-attachment: fixed;
    background-size: cover;
    /*background-size: 100% 100%;*/
    background-repeat: no-repeat;
    background-position: center;
    /* background-color: #f2f2f2; */
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .login_box {
    /* width: 320px; */
    cursor: move;
    /* margin-left: 10%; */
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.4);
  }
  .login_card {
    background-color: transparent;
  }
  .login_register_tip {
    color: #888;
  }
  .login_register_tip:hover,
  .login_register_tip:active {
    color: #282828;
  }
</style>
<script>
  import { KitUtil, StorageUtil } from '../../utils/index'
  import { mapGetters } from 'vuex'
  import * as types from '../../store/mutation-types'
  export default {
    name: 'Login',
    data () {
      return {
        formRef: 'LoginForm',
        appName: this.$store.state.appName,
        formItems: {
          user: '',
          password: ''
        },
        formRules: {
          user: [
            {
              required: true,
              message: '请输入您的用户名',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入您的密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码最少6位',
              trigger: 'blur'
            }
          ]
        },
        isLoggingIn: false
      }
    },
    computed: {
      ...mapGetters({
        themeImage: 'moduleSettings/themeImage'
      }),
      themeImages () {
        return this.$store.state.themeImages
      },
      activeThemeIndex () {
        return this.$store.state.activeThemeIndex
      },
      mainContentStyles () {
        return {
          backgroundImage: (this.themeImage ? 'url(' + this.themeImage + ')' : '')
          // backgroundImage: (this.activeThemeIndex.join(';').indexOf('-1') < 0 ? 'url(' + this.themeImages[this.activeThemeIndex[0]].sublist[this.activeThemeIndex[1]].img + ')' : '')
        }
      },
      localStorageKeys () {
        return this.$store.state.localStorageKeys
      },
      mainColor () {
        return this.$store.state.mainColor
      },
      loginRegisterTipStyles () {
        return {
          color: `rgba(${this.mainColor[0]}, ${this.mainColor[1]}, ${this.mainColor[2]}, 0.7)`
        }
      },
      bodyStyles () {
        return this.$store.state.bodyStyles
      }
    },
    methods: {
      login () {
        const that = this
        if (this.isLoggingIn) return
        this.isLoggingIn = true
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            this.isLoggingIn = false
            this.$store.dispatch(types.LOGIN, {
              username: this.formItems.user,
              password: this.formItems.password,
              callback (res) {
                if (Number(res.status) === 200) {
                  // 登录成功
                  if (res.data.status === 1) {
                    that.$Message.success('登录成功!')
                    if (res.data.settings) {
                      res.data.settings = JSON.parse(res.data.settings)
                    }
                    that.$store.commit(types.CACHE_LOGIN_INFO, res.data)
                    that.$router.replace('/')
                  } else {
                    that.$store.commit(types.REMOVE_LOGIN_INFO)
                    that.$Notice.error({
                      title: '登录错误',
                      desc: '您的账号已经被锁定，请联系管理员'
                    })
                  }
                } else {
                  that.$Message.error('登录失败：' + res.message)
                }
              },
              error (err) {
                that.$Message.error('登录失败：' + err)
              }
            })
          } else {
            this.isLoggingIn = false
            this.$Message.error('表单填写不正确!')
          }
        })
      }
    },
    watch: {
      'isLoggingIn': function (value) {
        if (value) {
          this.$Message.loading({
            content: '登录中，请稍后...',
            duration: 2
          })
        } else {
        }
      }
    }
  }
</script>
