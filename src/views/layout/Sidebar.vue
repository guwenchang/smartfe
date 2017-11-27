<template>
  <el-menu mode="vertical"
           background-color="#334156"
           text-color="#BFCBD9"
           active-text-color="#318CFC"
           unique-opened :default-active="$route.path" :collapse="isCollapse">
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
      'roles',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
