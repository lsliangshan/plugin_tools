<template>
  <div class="settings_container"
       :style="settingsContainerStyles">
    <draggable class="settings_inner"
               :x="(bodyStyles.width - 500) / 2"
               :y="30"
               :w="500"
               :parent="true"
               :style="settingsInnerStyles">
      <div class="settings_item">
        <label class="settings_item_label">我的主页</label>
        <div class="settings_item_value">
          <Input type="text"
                 v-model="cacheBlankHomePage"
                 @on-change="changeBlankHomePage" />
        </div>
      </div>
      <div class="settings_tag_container">
        <div class="settings_tag_bg"></div>
        <div class="settings_tag_label">设置</div>
      </div>
      <!-- <div class="settings_item">
				<label class="settings_item_label">最多显示几项工具</label>
				<div class="settings_item_value">
					<Input type="text" :value="maxToolCount" @on-change="changeMaxToolCount" />
				</div>
			</div>
			<div class="settings_item">
				<label class="settings_item_label">工具</label>
				<div class="settings_item_value" @click="openToolTagsModal">
					<div class="router_item_tag" v-for="(item, index) in activeTools" :key="index" :class="{fade: (index >= maxToolCount)}">{{item.label}}</div>
				</div>
			</div> -->
      <div class="settings_item">
        <label class="settings_item_label">主题</label>
        <div class="settings_item_value h100">
          <div class="bg_preview_wrapper">
            <div class="bg_preview"
                 @click="openThemeImagesModal">
              <img v-if="customThemeImageValidate"
                   :src="customThemeImage">
              <img v-else-if="activeThemeIndex.join(';').indexOf('-1') < 0"
                   :src="themeImage" />
            </div>
          </div>
        </div>
      </div>
      <!-- <transition name="custom-theme-settings-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="settings_item"
             v-if="isLogin">
          <label class="settings_item_label">自定义主题</label>
          <div class="settings_item_value settings_item_value_2">
            <Input type="text"
                   v-model="customThemeImage"
                   @on-change="changeCustomThemeImage" />
            <div class="bg_preview_wrapper h100">
              <span>无自定义图片</span>
              <div class="bg_preview"
                   v-if="customThemeImageValidate">
                <img :src="customThemeImage" />
              </div>
            </div>
          </div>
        </div>
      </transition> -->
      <div class="settings_item">
        <label class="settings_item_label">清除缓存</label>
        <div class="settings_item_value">
          <Button type="warning"
                  @click="clearAllStorage">清除缓存</Button>
        </div>
      </div>
      <transition name="sync-settings-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <div class="settings_item"
             v-if="isLogin">
          <label class="settings_item_label"></label>
          <div class="settings_item_value">
            <Tooltip placement="top"
                     :transfer="true"
                     content="同步我的配置到远端">
              <Button type="primary"
                      @click="updateSettings">同步配置</Button>
            </Tooltip>
          </div>
        </div>
      </transition>
    </draggable>

    <!-- <Modal v-model="toolTagsModal.shown"
           :mask-closable="false"
           @on-ok="saveTools"
           ok-text="保存"
           title="订制您常用的工具">
      <div class="tool_modal_container">
        <div class="tool_modal_panel tool_modal_left_container active">
          <div class="tool_modal_panel_title">使用中的工具</div>
          <div class="tool_modal_panel_content">
            <draggable v-model="toolTagsModal.activeItems"
                       :options="{draggable: '.item', group: 'tools'}">
              <div v-for="(item, index) in toolTagsModal.activeItems"
                   :key="index"
                   class="item draggable_item">
                <Icon type="md-move"
                      size="16" />
                {{item.label}}
              </div>
            </draggable>
          </div>
        </div>
        <div class="tool_modal_panel tool_modal_right_container">
          <div class="tool_modal_panel_title">未使用的工具</div>
          <div class="tool_modal_panel_content">
            <draggable v-model="toolTagsModal.inactiveItems"
                       :options="{draggable: '.item', group: 'tools'}">
              <div v-for="(item, index) in toolTagsModal.inactiveItems"
                   :key="index"
                   class="item draggable_item">
                <Icon type="md-move"
                      size="16" />
                {{item.label}}
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </Modal> -->

    <Modal v-model="themeImagesModal.shown"
           :mask-closable="false"
           :fullscreen="true"
           @on-ok="saveTheme"
           ok-text="确定"
           title="选择主题">
      <transition name="custom-theme-image-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="themes_item_containner"
             v-if="isLogin">
          <div class="themes_item_label themes_item_label_2">
            <span>自定义主题</span>
            <Input type="text"
                   style="width: calc(100% - 200px); max-width: 400px;"
                   placeholder="请输入自定义图片"
                   v-model="customThemeImage"
                   @on-change="changeCustomThemeImage" />
          </div>
          <div class="themes_item_content">
            <div class="themes_item blank_theme"
                 :data-index="-2"
                 :data-sub-index="-2"
                 @click="chooseThemeImage">
              <!-- <div class="themes_item_selected"> -->
              <div class="bg_preview_wrapper"
                   style="width: 100%; height: 100%;">
                <span>无自定义图片</span>
                <div class="bg_preview"
                     style="width: 100%; height: 100%;"
                     v-if="customThemeImageValidate">
                  <img :src="customThemeImage"
                       v-if="customThemeImageValidate" />
                </div>
                <transition name="theme-item-transition"
                            enter-active-class="animated fast fadeIn"
                            leave-active-class="animated fast fadeOut">
                  <div class="themes_item_selected"
                       v-if="customThemeImageValidate">
                    <Icon type="md-checkmark"
                          size="40" />
                  </div>
                </transition>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="themes_item_containner">
        <div class="themes_item_label">不设置背景图</div>
        <div class="themes_item_content">
          <div class="themes_item blank_theme"
               :data-index="-1"
               :data-sub-index="-1"
               @click="chooseThemeImage">
            <div class="themes_item_selected"
                 v-if="!customThemeImageValidate && (cacheActiveThemeIndex[0] == -1 || cacheActiveThemeIndex[1] == -1)">
              <Icon type="md-checkmark"
                    size="40" />
            </div>
          </div>
        </div>
      </div>
      <div class="themes_item_container"
           v-for="(item, index) in themeImages"
           :key="index">
        <div class="themes_item_label">{{item.label}}</div>
        <div class="themes_item_content">
          <div class="themes_item"
               v-for="(itm, idx) in item.sublist"
               :key="idx"
               :data-index="index"
               :data-sub-index="idx"
               @click="chooseThemeImage">
            <img :src="itm.img" />
            <transition name="theme-item-transition"
                        enter-active-class="animated fast fadeIn"
                        leave-active-class="animated fast fadeOut">
              <div class="themes_item_selected"
                   v-if="!customThemeImageValidate && cacheActiveThemeIndex[0] == index && cacheActiveThemeIndex[1] == idx">
                <Icon type="md-checkmark"
                      size="40" />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<style scoped>
  .h100 {
    height: 100px !important;
  }
  .settings_container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    /*background-color: #f5f5f5;*/
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .settings_inner {
    position: relative;
    /* width: 500px; */
    height: auto;
    cursor: move;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 40px 15px 15px 15px;
    border-radius: 5px;
    overflow-y: auto;
  }
  .settings_tag_container {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 40px;
    pointer-events: none;
  }
  .settings_tag_bg {
    width: 0;
    height: 0;
    border-top: 20px solid rgb(79, 192, 141);
    border-right: 30px solid rgb(79, 192, 141);
    border-bottom: 20px solid transparent;
    border-left: 30px solid transparent;
  }
  .settings_tag_label {
    position: absolute;
    right: 4px;
    top: 6px;
    font-size: 13px;
    color: #ffffff;
    font-weight: bolder;
    transform-origin: center;
    transform: rotate(35deg);
  }
  .settings_item {
    width: 100%;
    margin: 15px 0;
    line-height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .settings_item_label {
    display: inline-block;
    width: 100px;
    height: 40px;
    font-size: 14px;
    line-height: 16px;
    color: #282828;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .settings_item_value {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    /* cursor: pointer; */
    /*background-color: #f8f8f8;*/
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .settings_item_value_2 {
    height: 150px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .router_item_tag {
    background-color: rgb(79, 192, 141);
    color: #ffffff;
    height: 24px;
    padding: 0 10px;
    border-radius: 4px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }
  .router_item_tag.fade {
    background-color: rgba(79, 192, 141, 0.5);
  }

  .tool_modal_container {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tool_modal_panel {
    width: 50%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .tool_modal_panel_title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    background-color: #f2f2f2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .tool_modal_panel.active .tool_modal_panel_title {
    background-color: rgba(79, 192, 141, 1);
    color: #fff;
  }
  .tool_modal_panel.active .tool_modal_panel_content {
    border-left: 1px solid rgba(79, 192, 141, 0.6);
    border-right: 1px solid rgba(79, 192, 141, 0.6);
    border-bottom: 1px solid rgba(79, 192, 141, 0.6);
    background-color: rgba(79, 192, 141, 0.1);
  }
  .tool_modal_panel_content {
    width: 100%;
    height: calc(100% - 32px);
    background-color: #f8f8f8;
    overflow-y: auto;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .tool_modal_panel_content > div {
    height: 250px;
  }
  .draggable_item {
    position: relative;
    cursor: move;
    width: 100%;
    height: 40px;
    border: 1px solid #c8c8c8;
    margin-top: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .draggable_item i {
    position: absolute;
    left: 10px;
  }

  .bg_preview_wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #f5f5f5;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
  }
  .bg_preview {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg_preview_wrapper .bg_preview {
    position: absolute;
    left: 0;
    top: 0;
  }
  .bg_preview img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
  }
  .bg_preview_wrapper span {
    font-size: 12px;
    color: #c8c8c8;
  }

  .themes_item_containner {
    width: 100%;
    margin-bottom: 15px;
  }
  .themes_item_label {
    height: 32px;
    line-height: 32px;
  }
  .themes_item_label_2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .themes_item_label_2 span {
    width: 120px;
  }
  .themes_item_content {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .themes_item {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    overflow: hidden;
  }
  .themes_item img {
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }
  .themes_item.blank_theme {
    background-color: #f8f8f8;
  }
  .themes_item_selected {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(79, 192, 141, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .themes_item_selected i {
    color: #ffffff;
  }
</style>
<script>
  import * as types from '../../store/mutation-types.js'
  import { createNamespacedHelpers, mapGetters } from 'vuex'
  const { mapActions } = createNamespacedHelpers('./store/modules')
  import { StorageUtil } from '../../utils/index.js'
  export default {
    name: 'settings',
    components: {
      // Draggable: () => import('vuedraggable')
    },
    data () {
      return {
        toolTagsModal: {
          shown: false,
          activeItems: [],
          inactiveItems: []
        },
        themeImagesModal: {
          shown: false
        },
        cacheActiveThemeIndex: [-1, -1],
        cacheBlankHomePage: '',
        customThemeImage: '', // 用户自定义的主题图片，优先级高于activeThemeIndex
        customThemeImageValidate: false
      }
    },
    computed: {
      ...mapGetters({
        userSettings: 'moduleUserSettings/userSettings',
        themeImage: 'moduleUserSettings/themeImage',
        blankHomePage: 'moduleUserSettings/blankHomePage',
        activeThemeIndex: 'moduleUserSettings/activeThemeIndex'
      }),
      maxToolCount () {
        return this.$store.state.maxToolCount
      },
      tools () {
        return this.$store.state.tools
      },
      bodyStyles () {
        return this.$store.state.bodyStyles
      },
      settingsContainerStyles () {
        return {
          minHeight: (this.bodyStyles.height - 65) + 'px'
        }
      },
      settingsInnerStyles () {
        return {
          maxHeight: (this.bodyStyles.height - 65 - 30) + 'px',
          height: 'auto'
        }
      },
      localStorageKeys () {
        return this.$store.state.localStorageKeys
      },
      activeTools () {
        return this.$store.state.activeTools
      },
      inactiveTools () {
        return this.$store.state.inactiveTools
      },
      themeImages () {
        return this.$store.state.themeImages
      },
      requestInfo () {
        return this.$store.state.requestInfo
      },
      // activeThemeIndex () {
      //   return this.$store.state.activeThemeIndex
      // },
      // blankHomePage () {
      //   return this.$store.state.blankHomePage
      // },
      loginInfo () {
        return this.$store.state.loginInfo
      },
      isLogin () {
        return this.$store.state.isLogin
      }
    },
    created () {
      this.$nextTick(() => {
        this.toolTagsModal.activeItems = JSON.parse(JSON.stringify(this.activeTools))
        try {
          this.toolTagsModal.inactiveItems = JSON.parse(JSON.stringify(this.inactiveTools))
        } catch (err) {
        }
        this.cacheActiveThemeIndex = this.activeThemeIndex
        this.cacheBlankHomePage = this.blankHomePage
      })
    },
    methods: {
      ...mapActions([
        'moduleUserSettings'
      ]),
      updateUserSettings (data) {
        return new Promise(async (resolve) => {
          await this.$store.dispatch('moduleUserSettings/updateUserSettings', data)
        })
      },
      validteImage (url, minWidth = 10) {
        return new Promise((resolve) => {
          let image = new Image()
          image.src = url
          image.onload = () => {
            resolve(image.width >= minWidth)
          }
          image.onerror = (e) => {
            resolve(false)
          }
        })
      },
      getActiveTools () {
        return new Promise(async (resolve) => {
          let activeTools = await StorageUtil.getItem(this.localStorageKeys.activeTools)
          resolve(activeTools || JSON.parse(JSON.stringify(this.tools)))
        })
      },
      getInactiveTools () {
        return new Promise(async (resolve) => {
          let inactiveTools = await StorageUtil.getItem(this.localStorageKeys.inactiveTools)
          resolve(inactiveTools || [])
        })
      },
      openToolTagsModal () {
        this.toolTagsModal.shown = true
      },
      async saveTools () {
        this.$store.commit(types.SET_ACTIVE_TOOLS, {
          tools: this.toolTagsModal.activeItems
        })
        this.$store.commit(types.SET_INACTIVE_TOOLS, {
          tools: this.toolTagsModal.inactiveTools
        })
        await StorageUtil.setItem(this.localStorageKeys.activeTools, this.toolTagsModal.activeItems)
        await StorageUtil.setItem(this.localStorageKeys.inactiveTools, this.toolTagsModal.inactiveItems)

      },
      changeMaxToolCount (e) {
        this.$store.commit(types.SET_MAX_TOOL_COUNT, {
          count: Number(e.target.value)
        })
      },
      openThemeImagesModal () {
        this.themeImagesModal.shown = true
      },
      chooseThemeImage (e) {
        this.cacheActiveThemeIndex = [Number(e.target.dataset.index), Number(e.target.dataset.subIndex)]
      },
      saveTheme () {
        let _preperToUpdate = {
          activeThemeIndex: this.cacheActiveThemeIndex
        }
        if (this.customThemeImageValidate) {
          _preperToUpdate.customThemeImage = this.customThemeImage
        } else {
          _preperToUpdate.customThemeImage = ''
        }
        this.updateUserSettings(_preperToUpdate)

        // this.$store.commit(types.SET_ACTIVE_THEME_INDEX, {
        //   activeThemeIndex: this.cacheActiveThemeIndex
        // })
        // if (this.customThemeImageValidate) {
        //   this.$store.commit(types.CACHE_CUSTOM_THEME_IMAGE, {
        //     customThemeImage: this.customThemeImage
        //   })
        // } else {
        //   this.$store.commit(types.CACHE_CUSTOM_THEME_IMAGE, {
        //     customThemeImage: ''
        //   })
        // }
      },
      changeBlankHomePage () {
        this.$store.commit(types.SET_BLANK_HOME_PAGE, {
          blankHomePage: this.cacheBlankHomePage
        })
      },
      changeCustomThemeImage () {
        // this.$store.commit(types.CACHE_CUSTOM_THEME_IMAGE, {
        //   customThemeImage: this.customThemeImage
        // })
      },
      updateSettings () {
        // updateUserSettings
        return new Promise(async (resolve) => {
          console.log('update settings: ', this.userSettings)
          await this.$store.dispatch(types.AJAX, {
            url: this.requestInfo.updateUserSettings,
            data: {
              phonenum: this.loginInfo.phonenum,
              token: this.loginInfo.token,
              settings: this.userSettings
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
      },
      clearAllStorage () {
        const that = this
        this.$Modal.confirm({
          title: '清除缓存',
          content: '删除缓存后，用户所有设置会恢复为默认，确定删除所有缓存？',
          okText: '确认',
          cancelText: '取消',
          async onOk () {
            for (let k in that.localStorageKeys) {
              if (that.localStorageKeys.hasOwnProperty(k)) {
                await StorageUtil.removeItem(that.localStorageKeys[k])
              }
            }
            that.$Message.success('缓存已经清除')
          }
        })
      }
    },
    watch: {
      customThemeImage: {
        immediate: true,
        async handler (val) {
          // 自定义图片是否可以正常渲染
          console.log('validate image:', val)
          if (!this.isLogin || !val) {
            this.customThemeImageValidate = false
          } else {
            let validator = await this.validteImage(val)
            console.log('validate result: ', validator)
            this.customThemeImageValidate = validator
          }
        }
      }
      // ,
      // customThemeImageValidate (val) {
      //   if (val) {
      //     this.$store.commit(types.CACHE_CUSTOM_THEME_IMAGE, {
      //       customThemeImage: this.customThemeImage
      //     })
      //   } else {
      //     this.$store.commit(types.CACHE_CUSTOM_THEME_IMAGE, {
      //       customThemeImage: ''
      //     })
      //   }
      // }
    }
  }
</script>