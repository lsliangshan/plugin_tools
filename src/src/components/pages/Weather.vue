<template>
  <div class="weather_container">
    Weather
  </div>
</template>
<style scoped>
  .weather_container {
    width: 100%;
    height: 100%;
    background-color: lightblue;
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    name: 'Weather',
    data () {
      return {
        city: '101010100',
        days: 1
      }
    },
    computed: {
      store () {
        return this.$store
      },
      state () {
        return this.store.state
      },
      requestInfo () {
        return this.state.requestInfo
      },
      loginInfo () {
        return this.state.loginInfo
      }
    },
    created () {
      this.getWeatherData()
    },
    methods: {
      getWeatherData () {
        return new Promise(async (resolve) => {
          await this.store.dispatch(types.AJAX, {
            url: this.requestInfo.getWeather,
            data: {
              phonenum: this.loginInfo.phonenum,
              token: this.loginInfo.token,
              city: this.city,
              days: this.days
            }
          }).catch(err => {
            this.$Message.error(err.message || '请求失败，请稍后再试')
            resolve(true)
          }).then(responseData => {
            if (responseData && responseData.status === 200) {
              console.log('.....', responseData)
            }
            resolve(true)
          })
        })
      }
    }
  }
</script>
