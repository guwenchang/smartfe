<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
    <sidebar-item :routes="roles"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
