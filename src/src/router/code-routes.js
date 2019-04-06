export default {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '代码处理工具'
  },
  children: [{
    path: '/json',
    name: 'json',
    meta: {
      label: 'JSON',
      title: 'JSON格式化',
      icon: '#route-json',
      name: 'JSON格式化',
      desc: '可以对JSON代码进行格式化和美化'
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Json.vue')
    }
  }, {
    path: '/url',
    name: 'url',
    meta: {
      label: 'URL',
      title: 'URL参数解析',
      icon: '#route-url',
      name: 'URL参数解析',
      desc: 'URL参数解析，URL参数转JSON，JSON转URL参数格式'
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Url.vue')
    }
  }, {
    path: '/time',
    name: 'time',
    meta: {
      label: '时间戳',
      title: '时间戳转换',
      icon: '#route-time',
      name: '时间戳转换',
      desc: '时间戳与北京时间互转，获取时间戳'
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
      desc: '在线检测/比较两个文件或文本的不同'
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
      desc: 'html实体代码查询'
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Code.vue')
    }
  }]
}
