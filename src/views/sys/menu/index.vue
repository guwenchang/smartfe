<template>
  <div>

    <el-button type="primary" @click="openDialog()"><i class="el-icon-plus"></i>新建</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="menuForm" status-icon :rules="rules" ref="menu" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="menuForm.type">
            <el-radio :label="0">目录 </el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级">
          <el-button @click="visibleTree(true)">选择父级</el-button>
          <label>{{pMenu.name}}</label>
        </el-form-item>
        <el-form-item label="权限地址">
          <el-input v-model="menuForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="menuForm.perms" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menuForm.orderNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限icon">
          <el-input v-model="menuForm.icon" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save('menu')">确 定</el-button>
      </div>

      <div class="tree" v-if="showTree">
        <div class="mt-header">
          选择父级
        </div>
        <el-tree :data="menuItems" :highlight-current="true" :default-expand-all="true" :props="labelProps"
                 @node-click="handleNodeClick"></el-tree>
        <div class="mt-footer">
          <a @click="visibleTree(false)">取消</a>
          <el-button @click="parentTrue()">确定</el-button>
        </div>
      </div>

    </el-dialog>  </div>
</template>

<script>
  import { getMenuList, getMenuDetail, saveMenu } from '@/api/sys'

  export default {
    // 组件名称
    name: 'MenuList',
    // 组件数据
    data() {
      return {
        menuList: [],
        title: '添加菜单',
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        labelProps: {
          children: 'children',
          label: 'name'
        },
        pMenu: {},
        dialogFormVisible: false,
        showTree: false,
        menuForm: {},
        menuItems: []
      }
    },
    // 子组件列表
    components: {},
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
        this.modalInit(id)
      },
      initMenuList() {
        getMenuList().then(response => {
          this.menuList = response.data
          this.menuItems = Object.assign([], this.menuList)
          this.menuItems.unshift({ 'id': 0, 'name': '顶层菜单' })
        })
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchSaveMenu()
          } else {
            return false
          }
        })
      },
      fetchSaveMenu() {
        saveMenu(this.menuForm).then(response => {
          this.$message({
            message: `${this.title}成功消息`,
            type: 'success'
          })
          this.initMenuList()
          this.close()
        })
      },
      // 控制父级树
      visibleTree(bl) {
        this.showTree = bl
      },
      // 选择菜单
      handleNodeClick(arg) {
        this.pMenu = {
          name: arg.name,
          id: arg.id
        }
      },
      parentTrue() {
        this.menuForm.parentId = this.pMenu.id
        this.visibleTree(false)
      },
      modalInit(id) {
        if (id) {
          getMenuDetail(id).then(response => {
            this.menuForm = response.data
            this.pMenu.name = response.data.parentName
          })
        } else {
          this.menuForm = {}
          this.pMenu = {}
        }
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
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
