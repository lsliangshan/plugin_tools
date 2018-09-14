<template>
  <div class="top_menu_container">
    <Menu mode="horizontal" theme="light" :active-name="activeTool" @on-select="useTool">
      <MenuItem v-for="(t, index) in tools.slice(0, maxCount)" :key="index" :name="t.pathName">
        {{t.label}}
      </MenuItem>
      <Submenu v-if="tools.length > maxCount" name="more">
        <template slot="title" style="line-height: 65px;">
          <Icon type="ios-more" size="20" />
        </template>
        <MenuItem v-for="(t, index) in tools.slice(maxCount)" :key="index" :name="t.pathName" class="no_border_bottom">
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
    color: rgb(79, 192, 141);
    border-bottom: 2px solid rgb(79, 192, 141);
  }
  .no_border_bottom {
    border-bottom: none!important;
  }
</style>
<script>
export default {
  name: 'TopMenu',
  data () {
    return {
      maxCount: 3
    }
  },
  computed: {
    tools () {
      return this.$store.state.tools
    },
    activeTool () {
      return this.$route.name || ''
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
