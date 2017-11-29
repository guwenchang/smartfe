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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="roleForm" status-icon :rules="rules" ref="role" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="type">
          <el-tree
            :data="menuItems"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="roleForm.menuIds"
            :props="defaultProps"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save('role')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getRoleList, getRoleDetail, saveRole, getMenuList } from '@/api/sys'

  export default {
    // 组件名称
    name: 'MenuList',
    // 组件数据
    data() {
      return {
        roleList: [],
        title: '添加角色',
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ]
        },
        menuItems: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dialogFormVisible: false,
        roleForm: {}
      }
    },
    // 子组件列表
    components: {},
    // 组件实例被创建之后被调用
    created() {
      console.log('created')
      this.initRoleList()
      this.initMenuItems()
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
        this.modalInit(id)
      },
      initRoleList() {
        getRoleList().then(response => {
          this.roleList = response.data
        })
      },
      initMenuItems() {
        getMenuList().then(response => {
          this.menuItems = response.data
        })
      },
      // 开始
      roleDetail(id) {
        if (!id) {
          this.roleForm = {}
          this.roleForm.menuIds = []
        } else {
          getRoleDetail(id).then(response => {
            this.roleForm = response.data
          })
        }
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchSaveRole()
          } else {
            return false
          }
        })
      },
      // 结束
      fetchSaveRole() {
        this.roleForm.menuIds = this.$refs.tree.getCheckedKeys()
        saveRole(this.roleForm).then(response => {
          this.$message({
            message: `${this.title}成功消息`,
            type: 'success'
          })
          this.initRoleList()
          this.close()
        })
      },
      close() {
        this.dialogFormVisible = false
      },
      modalInit(id) {
        this.dialogFormVisible = true
        this.roleDetail(id)
      }
    },
    watch: {
      'roleForm.menuIds': {
        deep: true,
        handler(newVal, oldVal) {
          if (oldVal) {
            this.$refs.tree.setCheckedKeys(newVal)
          }
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel='stylesheet/scss'>
  .tree {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 100000000;
    padding: 0 20px 20px;
    background-color: #fff;
    .mt-header {
      padding: 10px;
      margin-left: -20px;
      margin-right: -20px;
      background-color: #f0f0f0;
      margin-bottom: 20px;
    }
    .mt-footer {
      box-sizing: border-box;
      background-color: #fff;
      text-align: right;
      padding: 20px;
      position: absolute;
      width: 95%;
      bottom: 0;
      button {
        margin-left: 20px;
      }
      a {
        cursor: pointer;
        &:hover {
          color: #00AAFF;
        }
      }
    }
  }
</style>
