<template>
  <div class="sheet_container">
    <div class="sheet_item" :class="{active: -1 === activeIndex}" @click="chooseRecentlyPlayList">最近收听的</div>

    <div class="sheet_item_title">创建的歌单</div>
    <div class="sheet_item" v-for="(item, index) in myList" :key="index" :class="{active: (index === activeIndex)}" :data-index="index" @click="choosePlayList">
      <div class="sheet_item_img pen">
        <img :src="item.coverImgUrl">
      </div>
      <div class="sheet_item_name pen">{{item.name.replace(nemLoginInfo.profile.nickname, '我')}}</div>
    </div>
    <div class="sheet_item_title">收藏的歌单</div>
    <div class="sheet_item" v-for="(item, index) in othersList" :key="myList.length + index" :class="{active: ((myList.length + index) === activeIndex)}" :data-index="myList.length + index" @click="choosePlayList">
      <div class="sheet_item_img pen">
        <img :src="item.coverImgUrl">
      </div>
      <div class="sheet_item_name pen">{{item.name.replace(nemLoginInfo.profile.nickname, '我')}}</div>
    </div>
  </div>
</template>
<style scoped>
  .pen {
    pointer-events: none;
  }
  .sheet_container {
    width: 100%;
    height: 100%;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
    color: #ffffff;
    overflow: auto;
    background-color: rgba(0, 0, 0, 1);
  }
  .sheet_item_title {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    box-sizing: border-box;
    /*color: rgba(79, 192, 141, .8);*/
    color: #e8e8e8;
    background-color: #000;
  }
  .sheet_item {
    width: 100%;
    /*height: 48px;*/
    padding: 10px;
    box-sizing: border-box;    
    cursor: pointer;
    color: #989898;
    transition: all .3s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .sheet_item.active {
    background-color: rgba(255, 255, 255, .2);
    /*color: #ffffff;*/
    color: rgba(79, 192, 141, 1);
  }
  .sheet_item:hover {
    background-color: rgba(255, 255, 255, .15);
  }
  .sheet_item .sheet_item_img {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .sheet_item .sheet_item_img img {
    max-width: 32px;
    max-height: 32px;    
  }
  .sheet_item .sheet_item_name {
    width: 98px;
    padding-left: 5px;
    box-sizing: border-box;
  }
</style>
<script>
  export default {
    name: 'AudioPlaySheet',
    props: {
      currentIndex: {
        type: [String, Number],
        default: -1
      }
    },
    data () {
      return {
        activeIndex: -1,
        userPlayList: [],
        myList: [],
        othersList: [],
        playListDetail: {}
      }
    },
    computed: {
      nemLoginInfo () {
        return this.$store.state.nemLoginInfo
      },
      recentlyPlayList () {
        return this.$store.state.recentlyPlayList
      }
    },
    async created () {
      this.activeIndex = Number(this.currentIndex)
      this.userPlayList = await this.getUserPlayList()
      let _l = this.categorizeList(this.userPlayList)
      this.myList = _l.my
      this.othersList = _l.others
    },
    methods: {
      getUserPlayList () {
        return new Promise(async (resolve) => {
          let userPlayListData = await this.$store.dispatch('moduleNem/userPlayList', {
            uid: this.nemLoginInfo.userPoint.userId,
            offset: 0,
            limit: 1000
          })
          resolve(userPlayListData)
        })
      },
      categorizeList () {
        let _list = this.userPlayList.playlist
        let outObject = {
          my: [],
          others: []
        }
        let i = 0
        for (i; i < _list.length; i++) {
          if (_list[i].creator && _list[i].creator.userId) {
            if (_list[i].creator.userId !== this.nemLoginInfo.userPoint.userId) {
              outObject.others.push(_list[i])
            } else {
              outObject.my.push(_list[i])
            }
          }
        }
        return outObject
      },
      async choosePlayList (e) {
        this.activeIndex = Number(e.target.dataset.index)
        let _pd = await this.getPlayListDetail()
        this.playListDetail = _pd.playlist
        this.$emit('change', {
          detail: this.playListDetail,
          index: Number(this.activeIndex)
        })
      },
      getPlayListDetail () {
        return new Promise(async (resolve) => {
          let playListDetailData = await this.$store.dispatch('moduleNem/playListDetail', {
            id: this.userPlayList.playlist[Number(this.activeIndex)].id,
            offset: 0,
            total: true,
            limit: this.userPlayList.playlist[Number(this.activeIndex)].trackCount
          })
          resolve(playListDetailData)
        })
      },
      chooseRecentlyPlayList () {
        this.activeIndex = -1
      }
    },
    watch: {
      currentIndex (val) {
        this.activeIndex = Number(val)
      }
    }
  }
</script>