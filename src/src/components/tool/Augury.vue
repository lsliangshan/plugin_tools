<template>
  <div class="container"
       :style="containerStyles">
    <div class="inner">
      <!-- <div class="greeting">
        <svg viewBox="0 0 100 100">
          <g fill="none" fill-rule="evenodd" stroke="rgba(255, 255, 255, 0.2)" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" class="lines">
            <path d="m19.83887,28.38184c0.96239,-0.15362 1.8644,-0.21694 2.73889,-0.3609c0.94444,-0.15548 1.89006,-0.30139 2.60046,-0.36351c0.95206,-0.08325 1.89936,-0.28683 2.79513,-0.48584c0.71484,-0.15881 1.5685,-0.41089 2.50024,-0.58472c0.86241,-0.16089 1.8164,-0.1966 2.74415,-0.3645c0.74122,-0.13414 1.68388,-0.33758 2.55763,-0.52207c0.9264,-0.19561 1.71684,-0.30898 2.71204,-0.53216c0.68717,-0.1541 1.35153,-0.38216 2.42514,-0.54354c0.90035,-0.13534 1.9085,-0.20411 2.70393,-0.29687c0.78985,-0.0921 1.67105,-0.32624 2.68186,-0.41512c0.77785,-0.0684 1.64594,-0.03955 2.60541,-0.03955c0.86588,0 1.74458,0.08732 2.73395,-0.03955c0.85471,-0.1096 1.67236,-0.19758 2.60339,-0.19775c0.82677,-0.00016 1.60046,-0.02832 2.63187,-0.13637c0.83244,-0.0872 1.63859,-0.09229 2.70642,-0.102c0.77194,-0.00702 1.82868,-0.06235 2.50962,-0.12253c0.70306,-0.06213 1.88758,-0.18393 2.59192,-0.25609c1.14262,-0.11707 1.80127,-0.1873 2.64578,-0.28477c1.0019,-0.11563 1.74983,-0.20405 2.74617,-0.35596c1.02535,-0.15633 1.74053,-0.25301 2.6647,-0.51827c0.98135,-0.28168 1.6643,-0.49106 2.62507,-0.59599l0.85643,-0.2373"/>
            <path d="m42.62012,7.97363c0.30723,1.05858 0.47115,2.00019 0.57554,2.85114c0.11987,0.97712 0.25834,1.80823 0.37368,2.69926c0.11507,0.88896 0.12434,1.75293 0.22374,2.64571c0.09852,0.88496 0.18642,1.73656 0.25689,2.49874c0.08329,0.90101 0.27615,1.96024 0.42461,2.64864c0.20969,0.97231 0.18393,1.78713 0.32084,2.79323c0.11432,0.8401 0.31575,1.66619 0.45499,2.48853c0.14928,0.88163 0.16163,1.74957 0.38455,2.65758c0.22105,0.90039 0.50621,1.75686 0.54477,2.60015c0.04189,0.9159 0.10664,1.7663 0.23727,2.69515c0.1203,0.85538 0.37946,1.64464 0.48711,2.56182c0.09878,0.84161 0.23518,1.80254 0.36118,2.59212c0.13173,0.82543 0.28514,1.73206 0.40836,2.58366c0.11548,0.79816 0.28881,1.75357 0.40342,2.71417c0.10362,0.86847 0.06357,1.73953 0.19123,2.55316c0.13407,0.85454 0.24069,1.8512 0.29695,2.70464c0.05624,0.85328 0.20474,1.77118 0.22449,2.58947c0.02414,1.00019 0.1277,1.80542 0.31672,2.70243c0.15836,0.75154 0.32956,1.73391 0.43506,2.6499c0.09473,0.82248 0.25743,1.74616 0.41512,2.63566c0.14149,0.79816 0.24282,1.78057 0.25724,2.65394c0.01371,0.83049 -0.0115,1.74837 0.10093,2.64112c0.11115,0.88255 0.13637,1.74846 0.13637,2.52303c0,1.00491 0,1.86173 0,2.72457c0,0.94815 0.0722,1.8171 -0.00494,2.68154c-0.07708,0.86371 -0.17492,1.82365 -0.27191,2.729c-0.08208,0.7661 -0.18668,1.61776 -0.36494,2.57646c-0.16245,0.87365 -0.25452,1.69788 -0.34698,2.68379c-0.07773,0.82888 -0.26247,1.73325 -0.3503,2.49388c-0.11354,0.98328 -0.18382,1.8752 -0.43692,2.68696c-0.28714,0.92095 -0.50549,1.70304 -0.83436,2.61066c-0.29155,0.80462 -0.70977,1.93732 -1.31506,1.7699c-0.8771,-0.24261 -1.15379,-1.34414 -1.59366,-2.08029c-0.41477,-0.69415 -0.8616,-1.53293 -1.20171,-2.39484c-0.32679,-0.82815 -0.72444,-1.61536 -1.15045,-2.35885c-0.43884,-0.76587 -0.78659,-1.57285 -1.20397,-2.40762c-0.40448,-0.80897 -0.87837,-1.5293 -1.40575,-2.3369c-0.40089,-0.6139 -1.00658,-1.32608 -1.56305,-2.00063c-0.5989,-0.72599 -0.98086,-1.47287 -1.52982,-2.26294l-0.47457,-0.71191l-0.4544,-0.78279l-0.32874,-0.79726"/>
            <path d="m16.2793,46.17969c1.14697,-0.47461 1.89702,-0.9134 2.6815,-1.21025c0.82565,-0.31243 1.68485,-0.58189 2.48921,-0.83057c0.88101,-0.27237 1.63617,-0.54585 2.45927,-0.88926c0.85254,-0.3557 1.74014,-0.51006 2.58014,-0.82788c0.889,-0.33636 1.70159,-0.73537 2.49585,-1.05933c0.86461,-0.35265 1.70943,-0.51613 2.52109,-0.87803c0.81067,-0.36145 1.59955,-0.76758 2.39239,-1.02041c0.88609,-0.28257 1.65318,-0.58447 2.5564,-0.87803c0.79653,-0.25888 1.58122,-1.20825 2.45179,-0.94922c0.60091,0.17879 0.03891,1.30669 -0.28144,2.13574c-0.32006,0.8283 -0.54145,1.67308 -0.89638,2.41449c-0.36598,0.7645 -0.55915,1.63725 -0.8755,2.47505c-0.29001,0.76807 -0.66032,1.58972 -1.00048,2.34477c-0.37817,0.83945 -0.66866,1.66184 -1.14037,2.56641c-0.40917,0.78464 -0.77807,1.40034 -1.20515,2.25436c-0.42721,0.85426 -0.79467,1.62246 -1.25392,2.37336c-0.49441,0.80838 -0.85662,1.58852 -1.21658,2.31926c-0.41734,0.84722 -0.85211,1.52506 -1.35011,2.35533c-0.49836,0.83087 -0.84444,1.44284 -1.35517,2.35533c-0.45543,0.81369 -0.91665,1.44946 -1.45294,2.15346c-0.50235,0.65944 -1.00931,1.3546 -1.51974,2.17873c-0.44233,0.71418 -1.02306,1.49634 -1.72342,2.2114c-0.47091,0.48079 -1.18173,1.23038 -1.66113,1.75954c-0.70493,0.7781 -1.31566,1.30878 -2.01709,1.94748c-0.60243,0.54855 -1.28781,1.23062 -1.89844,1.6889c-0.80375,0.60322 -1.56902,1.01059 -2.32555,1.53338c-0.72811,0.50314 -1.50593,0.89934 -2.32183,1.13906c-0.81629,0.23984 -1.60671,0.59738 -2.44784,0.87696l-0.81051,0.2061l-0.93324,0.10239l-0.84623,-0.01918"/>
            <path d="m73.94434,31.22949c-0.20946,0.97833 -0.73026,1.82797 -1.25775,2.54936c-0.46664,0.63818 -0.97365,1.33972 -1.5108,2.15718c-0.44024,0.66997 -0.84747,1.51395 -1.37411,2.19902c-0.52197,0.67899 -1.18624,1.40905 -1.76622,2.07579c-0.55962,0.64334 -1.05933,1.28329 -1.78232,1.88467c-0.72938,0.60669 -1.52879,1.12634 -2.08575,1.58899c-0.69551,0.57775 -1.52958,1.19711 -2.12626,1.49597c-0.86781,0.43465 -1.57421,0.89439 -2.42747,1.2729c-0.82856,0.36756 -1.7582,0.43378 -2.71571,0.63598c-0.79225,0.1673 -1.67217,0.23257 -0.80304,0.55054c0.63765,0.23329 1.16865,0.50016 2.14777,1.03149c0.7935,0.43061 1.66552,0.96152 2.13574,1.24585c0.49042,0.29655 1.52069,0.9297 2.61035,1.60181c0.56346,0.34754 1.13794,0.70157 2.31546,1.42826c0.60148,0.37119 1.21007,0.74715 1.82464,1.12767c0.62005,0.38391 1.87185,1.16148 2.50119,1.55431c0.62933,0.39281 1.25537,0.78461 1.87447,1.17501c1.21028,0.7632 1.79411,1.13534 2.35976,1.49913c1.07033,0.68838 2.03918,1.32662 2.48838,1.62439c0.8353,0.55371 1.59168,1.0598 1.94827,1.28876c1.27675,0.8198 1.85773,1.14988 2.64532,1.60299c0.93208,0.53624 1.56056,0.89487 2.26595,1.35445c0.80873,0.52692 1.4491,1.28307 2.22877,1.69594c0.79578,0.42139 1.70002,0.37936 2.55628,0.50776c0.8083,0.1212 1.72828,0.49861 2.62451,0.70851c0.88464,0.20718 1.71369,0.41132 2.53931,0.56953l0.81392,0.11865l0.89108,0"/>
            <path d="m62.79102,7.73633c0.89574,0.15346 1.66818,0.66114 2.35968,1.10303c0.80169,0.51231 1.5079,1.08538 2.2241,1.53485c0.74218,0.46577 1.42506,1.10137 2.06075,1.63361l0.78204,0.32206l0.40448,0.74087l0.59326,0.59821"/>
          </g>
        </svg>
      </div> -->
      <!-- <p class="demo_text">测试</p> -->
      <div class="box">
        <div class="hd">程序员</div>
        <div class="su_hd">
          <div class="icn">
            <svg>
              <use xlink:href="#augury-qiu"></use>
            </svg>
          </div>
          <span>开发测试升职跳槽陨石核弹各类吉凶</span>
        </div>
        <div class="dt">
          {{getDateStr()}}
        </div>
        <div class="tip">
          <div class="it">- 开发测试修复提交之前求一签，可避凶趋吉</div>
          <div class="it">- 选择所求之事并在心中默念，再单击“求”即可</div>
        </div>
        <div class="content">
          <div class="item"
               v-for="(item, index) in list"
               :key="index"
               :class="{active: (index === activeIndex)}"
               :data-index="index"
               @click="chooseType">{{item.name}}</div>
        </div>
        <div class="ft">
          <transition name="game-transition"
                      enter-active-class="animated fadeInDown faster"
                      leave-active-class="animated fadeOut faster">
            <div class="game"
                 v-if="playing"></div>
          </transition>
          <transition name="btn-transition"
                      enter-active-class="animated fadeIn delay-1s"
                      leave-active-class="animated fadeOutDown faster">
            <div class="btn"
                 v-if="!playing"
                 @click="qiuqian">
              <svg>
                <use xlink:href="#augury-qiu"></use>
              </svg>
            </div>
          </transition>
          <transition name="result-transition"
                      enter-active-class="animated bounceIn delay-2s"
                      leave-active-class="animated fadeOut">
            <div class="result"
                 v-if="!playing && result">
              <div class="wrapper"
                   :style="{transform: 'rotate(-' + Math.floor(Math.random() * 30) + 'deg)'}">
                <div class="inner"
                     :class="{danger: (resultIndex > 2)}">
                  {{result}}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@keyframes play {
  100% {
    background-position: -737px -2px;
  }
}
@-webkit-keyframes play {
  100% {
    background-position: -737px -2px;
  }
}
.container {
  width: 100%;
}
.inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #000;
}
.inner .box {
  width: 360px;
  height: 480px;
  border-radius: 4px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 1px #ccc, 0 0 2px #ccc, 0 0 3px #ccc, 0 0 4px #fff,
    0 0 5px #fff, 0 0 6px #fff, 0 0 7px #fff, 0 0 8px #fff;
  background-color: #c8c8c8;
}
.box .hd {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #333;
  text-shadow: 0 0 1px #fff;
}
.box .su_hd {
  width: 100%;
  height: 24px;
  color: #dc143c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.box .su_hd .icn {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #dc143c;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box .su_hd svg {
  width: 16px;
  height: 16px;
  fill: #fff;
}
.box .dt {
  width: 100%;
  height: 32px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
}
.box .tip {
  width: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
}
.box .content {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.box .content .item {
  width: 60px;
  height: 60px;
  background-color: #dadada;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.box .content .item.active {
  background-color: rgb(79, 192, 141);
  color: #fff;
}
.box .ft {
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.box .ft .game {
  width: 145px;
  height: 300px;
  transform: scale(0.5);
  display: inline-block;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url(/static/images/augury.png);
  background-position: -2px -2px;
  animation: play 0.8s steps(5) infinite;
  -webkit-animation: play 0.8s steps(5) infinite;
  animation-delay: 500ms;
}
.box .ft .btn {
  cursor: pointer;
  position: absolute;
}
.box .ft .btn svg {
  width: 50px;
  height: 50px;
  fill: #dc143c;
}
.box .ft .result {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
@keyframes result {
  0% {
    transform: scale(3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.box .ft .result .inner {
  width: 100px;
  height: 40px;
  font-weight: bolder;
  border: 2px solid rgb(79, 192, 141);
  background-color: transparent;
  color: rgb(79, 192, 141);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: result 0.3s;
  animation-delay: 2s;
}
.box .ft .result .inner.danger {
  border-color: #dc143c !important;
  color: #dc143c !important;
}

.greeting {
  width: 120px;
  height: 120px;
}
.greeting svg {
  width: 120px;
  height: 120px;
}
.demo_text {
  -webkit-user-select: none;
  color: #eee;
  font-size: 40px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  animation: neon3 1.5s ease-in-out infinite alternate;
  /*-webkit-animation: neon1 1.5s ease-in-out infinite alternate;*/
}
.demo_text:hover {
  color: #fff;
}
@keyframes neon1 {
  0% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff1177,
      0 0 70px #ff1177, 0 0 80px #ff1177, 0 0 100px #ff1177, 0 0 150px #ff1177;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff1177,
      0 0 35px #ff1177, 0 0 40px #ff1177, 0 0 50px #ff1177, 0 0 75px #ff1177;
  }
}
@keyframes neon2 {
  0% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ccc,
      0 0 70px #ccc, 0 0 80px #ccc, 0 0 100px #ccc, 0 0 150px #ccc;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ccc,
      0 0 35px #ccc, 0 0 40px #ccc, 0 0 50px #ccc, 0 0 75px #ccc;
  }
}
@keyframes neon3 {
  0% {
    text-shadow: 0 0 10px #ccc, 0 0 20px #ccc, 0 0 30px #ccc, 0 0 40px #fff,
      0 0 70px #fff, 0 0 80px #fff, 0 0 100px #fff, 0 0 150px #fff;
  }
  100% {
    text-shadow: 0 0 5px #ccc, 0 0 10px #ccc, 0 0 15px #ccc, 0 0 20px #fff,
      0 0 35px #fff, 0 0 40px #fff, 0 0 50px #fff, 0 0 75px #fff;
  }
}
</style>
<script>
import anime from 'animejs'
import { StorageUtil } from '../../utils/index'
export default {
  name: 'augury',
  data () {
    return {
      activeIndex: -1,
      playing: false,
      list: [
        {
          name: '开发',
          value: 'develop'
        },
        {
          name: '测试',
          value: 'testing'
        },
        {
          name: '修复bug',
          value: 'fixbug'
        },
        {
          name: '提交代码',
          value: 'commit'
        },
        {
          name: '其它',
          value: 'other'
        }
      ],
      results: ['大吉', '中吉', '小吉', '小凶', '中凶', '大凶'],
      result: '',
      resultIndex: -1,
      storageKey: 'local-augury-result'
    }
  },
  computed: {
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    containerStyles () {
      return {
        height: this.bodyStyles.height - 65 + 'px'
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.animer = anime({
        targets: '.greeting .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 800,
        delay: function (el, i) {
          return i * 500
        },
        direction: 'alternate',
        loop: false,
        complete (anim) {
          setTimeout(() => {
            //  let relativeOffset = anime.timeline()
            //  relativeOffset
            //  .add([
            //    // {
            //    //  targets: '.greeting_wrapper .lines path',
            //    //  opacity: 0,
            //    //  offset: 0,
            //      // complete () {
            //      //  // that.$router.replace({
            //      //  //  name: 'json'
            //      //  // })
            //      // }
            // // }
            //    {
            //      targets: '.greeting_wrapper',
            //      scale: 0.42,
            //      duration: 500,
            //      left: -120,
            //      top: -20,
            //      easing: 'linear',
            //      complete () {
            //        that.$router.replace({
            //          name: 'index'
            //        })
            //      }
            //    }
            //  ])
          }, 800)
        }
      })
    })
  },
  methods: {
    getDateStr () {
      let _now = new Date()
      let _y = _now.getFullYear()
      let _m = _now.getMonth() + 1
      _m = _m < 10 ? '0' + _m : _m
      let _d = _now.getDate()
      _d = _d < 10 ? '0' + _d : _d
      let _week_day = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      let weekDay = _week_day[_now.getDay()]
      return `今天是${_y}年${_m}月${_d}日 ${weekDay}`
    },
    chooseType (e) {
      this.activeIndex = Number(e.target.dataset.index)
    },
    sleep (ts) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, ts || 3000)
      })
    },
    getTomorrowTs () {
      /**
       * 获取自然日  第二天 零点
       */
      let _now = new Date()
      _now.setHours(23)
      _now.setMinutes(59)
      _now.setSeconds(59)
      _now.setMilliseconds(0)
      return _now.getTime() + 1000
    },
    async getResult (result) {
      this.playing = true
      await this.sleep(3000)
      if (result) {
        this.result = result
        this.resultIndex = this.results.indexOf(result)
      } else {
        let _ran = Math.floor(Math.random() * this.results.length)
        this.resultIndex = _ran
        this.result = this.results[_ran]
        await StorageUtil.setItem(
          this.storageKey + '-' + this.list[Number(this.activeIndex)].value,
          {
            result: this.result,
            expireAt: this.getTomorrowTs()
          }
        )
      }
      this.playing = false
    },
    async qiuqian () {
      if (this.playing) {
        return
      }
      if (this.activeIndex < 0) {
        // 请先选择类型
        this.$Message.info('请先选择所求之事')
      } else {
        let _localResult = await StorageUtil.getItem(
          this.storageKey + '-' + this.list[Number(this.activeIndex)].value
        )
        if (_localResult) {
          if (_localResult.expireAt <= new Date().getTime()) {
            await StorageUtil.removeItem(
              this.storageKey + '-' + this.list[Number(this.activeIndex)].value
            )
            this.getResult()
          } else {
            this.getResult(_localResult.result)
          }
        } else {
          this.getResult()
        }
      }
    }
  }
}
</script>