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
                class="login_card">
            <p slot="title"
               style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
              <span v-text="'注册 ' + appName"></span>
              <Icon type="ios-move"
                    size="18" />
            </p>
            <Form :ref="formRef"
                  :model="formItems"
                  :rules="formRules">
              <FormItem prop="user">
                <Input type="text"
                       v-model="formItems.user"
                       placeholder="手机号">
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
                        :loading="isRegistering"
                        long
                        @click="register">
                  <span v-if="!isRegistering">注册</span>
                  <span v-else>注册中</span>
                </Button>
              </FormItem>
            </Form>
            <div class="login_bar">
              <!-- <router-link to="/register">
                    <span>忘记密码</span>
                  </router-link> -->
              <router-link to="/login">
                <span class="login_register_tip">已有账号，去登录</span>
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
    /* width: 320px;
        margin-left: 10%; */
    cursor: move;
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
  import * as types from '../../store/mutation-types'
  export default {
    name: 'Register',
    data () {
      const validatePhonenum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!value.match(/^1[345789]\d{9}$/)) {
            callback(new Error('手机号格式不正确'))
          }
          callback()
        }
      }
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
              validator: validatePhonenum,
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
        isRegistering: false
      }
    },
    computed: {
      themeImages () {
        return this.$store.state.themeImages
      },
      activeThemeIndex () {
        return this.$store.state.activeThemeIndex
      },
      mainContentStyles () {
        return {
          backgroundImage: (this.activeThemeIndex.join(';').indexOf('-1') < 0 ? 'url(' + this.themeImages[this.activeThemeIndex[0]].sublist[this.activeThemeIndex[1]].img + ')' : '')
        }
      },
      localStorageKeys () {
        return this.$store.state.localStorageKeys
      },
      bodyStyles () {
        return this.$store.state.bodyStyles
      }
    },
    methods: {
      register () {
        const that = this
        if (this.isRegistering) return
        this.isRegistering = true
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            this.isRegistering = false
            this.$store.dispatch(types.REGISTER, {
              phonenum: this.formItems.user,
              password: this.formItems.password,
              callback (res) {
                if (Number(res.status) === 200) {
                  // 登录成功
                  that.$Message.success('注册成功!')
                  // that.$store.commit(types.CACHE_LOGIN_INFO, res.data)
                  setTimeout(() => {
                    that.$router.replace({
                      name: 'login'
                    })
                  }, 800)
                } else {
                  that.$Message.error('注册失败：' + res.message)
                }
              },
              error (err) {
                that.$Message.error('注册失败：' + err)
              }
            })
          } else {
            this.isRegistering = false
            this.$Message.error('表单填写不正确!')
          }
        })
      }
    },
    watch: {
      'isRegistering': function (value) {
        if (value) {
          this.$Message.loading({
            content: '注册中，请稍后...',
            duration: 2
          })
        } else {
        }
      }
    }
  }
</script>
