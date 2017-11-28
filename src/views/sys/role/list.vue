<template>
  <div>

    <el-button type="primary" @click="openDialog()"><i class="el-icon-plus container_header_buttons"></i>新建</el-button>
    <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column
        label="序号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="remark">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" @click="openDialog(props.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <role-edit @fetchGo="initRoleList" :title="title"
               ref="role"></role-edit>
  </div>
</template>

<script>
  import { getRoleList } from '@/api/sys'
  import RoleEdit from './edit.vue'

  export default {
    // 组件名称
    name: 'MenuList',
    // 组件数据
    data() {
      return {
        roleList: [],
        title: '添加角色'
      }
    },
    // 子组件列表
    components: {
      RoleEdit
    },
    // 组件实例被创建之后被调用
    created() {
      console.log('created')
      this.initRoleList()
    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
      openDialog(id) {
        if (!id) {
          this.title = '添加角色'
        } else {
          this.title = '编辑角色'
        }
        setTimeout(() => {
          this.$refs.role.modalInit(id)
        }, 200)
      },
      initRoleList() {
        getRoleList().then(response => {
          this.roleList = response.data
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel='stylesheet/scss'>

</style>
