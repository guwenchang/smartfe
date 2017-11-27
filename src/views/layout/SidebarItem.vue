<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link v-if="item.children.length === 0" :to="item.url">
        <el-menu-item :index="item.url" class='submenu-title-noDropdown'>
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="item.children.length > 0">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0'
                        :routes='[child]'></sidebar-item>

          <router-link v-else :to="child.url">
            <el-menu-item :index="child.url">
              <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
              <span>{{child.name}}</span>
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

