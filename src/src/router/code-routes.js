export default {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '常用工具'
  },
  children: [{
    path: '/json',
    name: 'json',
    meta: {
      label: 'JSON',
      title: 'JSON格式化',
      icon: '#route-json',
      name: 'JSON格式化',
      desc: '可以对JSON代码进行格式化和美化',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Json.vue')
    }
  }, {
    path: '/qrcode',
    name: 'qrcode',
    meta: {
      label: '二维码',
      title: '二维码生成',
      icon: '#route-qrcode',
      name: '二维码生成',
      desc: '将字符生成二维码，可下载生成的二维码',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Qrcode.vue')
    }
  }, {
    path: '/base64',
    name: 'base64',
    meta: {
      label: 'BASE64',
      title: 'base64转换',
      icon: '#route-base64',
      name: 'base64编码解码',
      desc: '字符与base64互转，图片与base64互转',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Base64.vue')
    }
  }, {
    path: '/url',
    name: 'url',
    meta: {
      label: 'URL',
      title: 'URL参数解析',
      icon: '#route-url',
      name: 'URL参数解析',
      desc: 'URL参数转JSON，JSON转URL参数格式',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Url.vue')
    }
  }, {
    path: '/scripts',
    name: 'scripts',
    meta: {
      label: '网页脚本注入',
      title: '网页脚本注入',
      icon: '#route-scripts',
      name: '网页脚本注入',
      desc: '允许用户向目标网页注入脚本',
      createTime: '1555234941000',
      hot: true
    },
    components: {
      ContentRouter: () => import('../components/tool/Scripts.vue')
    }
  }, {
    path: '/time',
    name: 'time',
    meta: {
      label: '时间戳',
      title: '时间戳转换',
      icon: '#route-time',
      name: '时间戳转换',
      desc: '时间戳与北京时间互转，获取时间戳',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Time.vue')
    }
  }, {
    path: '/diff',
    name: 'diff',
    meta: {
      label: '文件对比',
      title: '文件对比',
      icon: '#route-diff',
      name: '文件对比',
      desc: '在线检测/比较两个文件或文本的不同',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () => import('../components/tool/Diff.vue')
    }
  }, {
    path: '/code',
    name: 'code',
    meta: {
      label: 'CHAR',
      title: 'html实体代码',
      icon: '#route-code',
      name: 'html实体代码',
      desc: 'html实体代码查询',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Code.vue')
    }
  }]
}
