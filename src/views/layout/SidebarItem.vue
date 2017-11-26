<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="item.children.length === 0" :to="item.url">
        <el-menu-item :index="item.url">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="item.children.length > 0">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" >
          <sidebar-item class='menu-indent' v-if='child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="child.url">
            <el-menu-item :index="child.url">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    created() {
      console.log(this.routes)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .svg-icon {
    margin-right: 10px;
  }

  .hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
  }
</style>

