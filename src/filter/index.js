export default {
  install(Vue, options) {
    Vue.filter('menuTypeFilter', function (value) {
      switch (value) {
        case 0:
          return '目录'
        case 1:
          return '菜单'
        case 2:
          return '按钮'
      }
    })
  }
}
