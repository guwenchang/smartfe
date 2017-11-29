<template>
<div>
  <el-button type="primary" @click="openDialog()"><i class="el-icon-plus"></i>新建</el-button>
  <el-table
    :data="userList"
    border
    style="width: 100%">
    <!--width="180"-->
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="realName"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="isStop"
      label="状态">
      <template slot-scope="scope">
        {{scope.row.isStop ? '禁用' : '正常'}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="small" type="primary" @click="openDialog(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="initUserList"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total" v-if="total">
  </el-pagination>

  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="userForm" status-icon :rules="rules" ref="user">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="userForm.realName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="userForm.roleIds" @change="roleIdsFun">
          <el-checkbox :key="item.id" :label="item.id"
                       v-for="(item,index) in roleList">{{item.roleName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="userForm.isStop"
          active-text="禁用"
          inactive-text="正常">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="save('user')">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
  import { getUserList, getRoleList, getUserDetail, saveUser } from '@/api/sys'

  export default {
    // 组件名称
    name: 'UserList',
    // 组件数据
    data() {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        userList: [],
        dialogFormVisible: false,
        title: '添加用户',
        userForm: {},
        roleList: [],
        rules: {
          realName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
            { min: 2, max: 25, message: '角色名称在 2 到 5 个字符', trigger: 'blur' }
          ],
          mobile: [ // /^1[3|4|5|7|8][0-9]\d{4,8}$/
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            { len: 11, message: '手机号码输入错误', trigger: 'blur' }
          ]
        }
      }
    },
    // 组件实例被创建之后被调用
    created() {
      console.log('created')
      this.initUserList()
      this.initRoleList()
    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
      roleIdsFun(arg) {
        console.log(this.userForm.roleIds)
      },
      initUserList(currentPage = 1) {
        getUserList({
          pageNo: currentPage,
          pageSize: this.pageSize
        }).then(response => {
          this.total = response.data.total
          this.userList = response.data.records
        })
      },
      initRoleList() {
        getRoleList().then(response => {
          this.roleList = response.data
        })
      },
      openDialog(id) {
        if (!id) {
          this.title = '添加用户'
        } else {
          this.title = '编辑用户'
        }
        this.modalInit(id)
      },
      userDetail(id) {
        if (!id) {
          this.userForm = {
            roleIds: [],
            isStop: false
          }
        } else {
          getUserDetail(id).then(response => {
            this.userForm = response.data
          })
        }
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchSaveUser()
          } else {
            return false
          }
        })
      },
      // 结束
      fetchSaveUser() {
        saveUser(this.userForm).then(response => {
          this.$message({
            message: `${this.title}成功消息`,
            type: 'success'
          })
          this.initUserList()
          this.close()
        })
      },
      close() {
        this.dialogFormVisible = false
      },
      modalInit(id) {
        this.dialogFormVisible = true
        this.userDetail(id)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel='stylesheet/scss'>

</style>
