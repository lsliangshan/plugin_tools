<template>
  <div class="blank_container"
       :style="blankContainerStyles">
    <div class="default_blank"
         key="defaultBlank"
         v-if="blankHomePage === 'default'">
      <img src="/static/images/new_logo.png">&trade;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: rgb(79, 192, 141);
  pointer-events: none;
}
.default_blank img {
  max-height: 40px;
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
</style>
<script>
export default {
  name: 'Blank',
  data () {
    return {}
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
    }
  }
}
</script>