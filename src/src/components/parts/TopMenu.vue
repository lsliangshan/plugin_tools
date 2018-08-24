<template>
  <div class="top_menu_container">
    <Menu mode="horizontal" theme="light" :active-name="activeTool" @on-select="useTool">
      <MenuItem v-for="(t, index) in tools" :key="index" :name="t.pathName">
        {{t.label}}
      </MenuItem>
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
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  .top_menu_container .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: rgb(79, 192, 141);
    border-bottom: 2px solid rgb(79, 192, 141);
  }
</style>
<script>
export default {
  name: 'TopMenu',
  data () {
    return {
      activeTool: ''
    }
  },
  computed: {
    tools () {
      return this.$store.state.tools
    }
  },
  methods: {
    useTool (name) {
      this.activeTool = name
      this.$router.replace({
        name: name
      })
    }
  },
  components: {}
}
</script>
