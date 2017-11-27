 <template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="data" status-icon :rules="rules" ref="menu" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="data.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="data.type">
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
          <el-input v-model="data.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="data.perms" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="data.orderNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限icon">
          <el-input v-model="data.icon" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary"  @click="save('menu')">确 定</el-button>
      </div>

      <div class="tree" v-if="showTree">
        <div class="mt-header">
          选择父级
        </div>
        <el-tree :data="menuList" :highlight-current="true" default-expand-all="true" :props="labelProps" @node-click="handleNodeClick"></el-tree>
        <div class="mt-footer">
          <a @click="visibleTree(false)">取消</a>
          <el-button @click="parentTrue()">确定</el-button>
        </div>
      </div>

    </el-dialog>
</template>

<script>
  import { getMenuDetail } from '@/api/sys'

  export default {
    // 组件名称
    name: 'MenuEdit',
    // 组件数据
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 10, message: '名称在 2 到 10 个字符', trigger: 'blur'}
          ]
        },
        labelProps: {
          children: 'children',
          label: 'name'
        },
        pMenu: {},
        dialogFormVisible: false,
        showTree: false,
        data: {},
        menuList: []
      }
    },
    props: {
      title: {
        type: String,
        default: '添加权限'
      }
    },
    // 子组件列表
    components: {},
    // 组件实例被创建之后被调用
    created() {

    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
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
        this.data.parentId = this.pMenu.id
        this.visibleTree(false)
      },
      modalInit(id, items) {
        if (id) {
          getMenuDetail(id).then(response => {
            this.data = response.data
          })
        }else {
          this.pMenu = {}
        }
        this.menuList = items
        this.dialogFormVisible = true
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
          color: rgb(255, 208, 75);
        }
      }
    }
  }
</style>
