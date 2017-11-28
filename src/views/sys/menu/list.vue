<template>
  <div>

    <el-button type="primary" @click="openDialog()"><i class="el-icon-plus container_header_buttons"></i>新建</el-button>
    <el-table
      :data="menuList"
      style="width: 100%" class="el-table__expanded-cell-mt">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.children"
            style="width: 100%"
            :show-header="false"
            :stripe="true" class="el-table-mt">
            <el-table-column width="60"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                {{scope.row.orderNum}}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
            <!--类型-->
            <el-table-column>
              <template slot-scope="scope">
                {{scope.row.type | menuTypeFilter}}
              </template>
            </el-table-column>
            <!--地址-->
            <el-table-column
              prop="url">
            </el-table-column>
            <el-table-column
              prop="perms">
            </el-table-column>
            <el-table-column prop="icon">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="pl-5">
                  <el-button type="primary" @click="openDialog(scope.row.id)">编辑</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        prop="orderNum">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="props">
          {{props.row.type | menuTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        prop="url">
      </el-table-column>
      <el-table-column
        label="权限编码"
        prop="perms">
      </el-table-column>
      <el-table-column
        label="icon"
        prop="icon">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" @click="openDialog(props.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <menu-edit ref="menu" @fetchGo="initMenuList" :title="title"></menu-edit>
  </div>
</template>

<script>
  import {getMenuList} from '@/api/sys'
  import MenuEdit from './edit.vue'

  export default {
    // 组件名称
    name: 'MenuList',
    // 组件数据
    data() {
      return {
        menuList: [],
        title: '添加菜单'
      }
    },
    // 子组件列表
    components: {
      MenuEdit
    },
    // 组件实例被创建之后被调用
    created() {
      console.log('created')
      this.initMenuList()
    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
      openDialog(id) {
        if (!id) {
          this.title = '添加菜单'
        } else {
          this.title = '编辑菜单'
        }
        setTimeout(() => {
          this.$refs.menu.modalInit(id, this.menuList)
        }, 200)
      },
      initMenuList() {
        getMenuList().then(response => {
          this.menuList = response.data
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel='stylesheet/scss'>

</style>
