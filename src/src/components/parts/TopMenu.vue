<template>
  <div class="top_menu_container">
    <Menu mode="horizontal" theme="light" :active-name="activeTool" @on-select="useTool">
      <MenuItem v-for="(t, index) in activeTools.slice(0, maxCount)" :key="index" :name="t.name" v-if="activeTools" :style="topMenuItemStyle">
        {{t.label}}
      </MenuItem>
      <Submenu v-if="activeTools.length > maxCount" name="more" :style="topMenuItemStyle">
        <template slot="title">
          <Icon type="ios-more" size="20" />
        </template>
        <MenuItem v-for="(t, index) in activeTools.slice(maxCount)" :key="index" :name="t.name" class="no_border_bottom" v-if="activeTools">
          {{t.label}}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<style>
  .top_menu_container {
    height: 65px;
  }
  .top_menu_container .ivu-menu-light {
    background-color: transparent;
  }
  .top_menu_container .ivu-menu-horizontal {
    height: 65px;
    line-height: 65px;
  }
  .top_menu_container .ivu-menu-submenu-title {
    line-height: 65px;
  }
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: rgb(79, 192, 141)!important;
    border-bottom: 2px solid rgb(79, 192, 141);
  }
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
    color: #FFFFFF;
  }
  .top_menu_container .ivu-menu-submenu-title {
    /*color: #FFFFFF;*/
  }
  .no_border_bottom {
    border-bottom: none!important;
    color: #515a6e!important;
  }
</style>
<script>
export default {
  name: 'TopMenu',
  data () {
    return {
    }
  },
  computed: {
    maxCount () {
      return this.$store.state.maxToolCount
    },
    tools () {
      return this.$store.state.tools
    },
    activeTool () {
      return this.$route.name || ''
    },
    activeTools () {
      return this.$store.state.activeTools
    },
    activeThemeIndex () {
      return this.$store.state.activeThemeIndex
    },
    topMenuItemStyle () {
      return {
        color: (this.activeThemeIndex.join(';').indexOf('-1') > -1 ? '#515a6e' : '#FFFFFF')
      }
    }
  },
  methods: {
    useTool (name) {
      this.$router.replace({
        name: name
      })
    }
  },
  components: {}
}
</script>
