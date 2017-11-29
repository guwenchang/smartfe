<template>
  <div>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
    <el-form size="small" :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.code" placeholder="字典编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initDicList()">查询</el-button>
        <el-button type="primary" @click="openDialog()"><i class="el-icon-plus"></i>新建</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-table
    :data="dicList"
    border
    style="width: 100%">
    <!--width="180"-->
    <el-table-column
      type="index"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="code"
      label="字典编码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="字典名称">
    </el-table-column>
    <el-table-column
      prop="value"
      label="字典值">
    </el-table-column>
    <el-table-column
      prop="orderNum"
      label="字典值">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="small" type="primary" @click="openDialog(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="initDicList"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total" v-if="total">
  </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="dicForm" status-icon :rules="rules" ref="dic">
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="dicForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="dicForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="dicForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input v-model="dicForm.orderNum" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save('dic')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getDicList, getDicDetail, saveDic } from '@/api/sys'

  export default {
    // 组件名称
    name: 'DicList',
    // 组件数据
    data() {
      return {
        filters: {
          code: ''
        },
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dicList: [],
        dialogFormVisible: false,
        title: '添加字典',
        dicForm: {},
        rules: {
          code: [
            { required: true, message: '请输入字典编码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入字典名称', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入字典值', trigger: 'blur' }
          ]
        }
      }
    },
    // 组件实例被创建之后被调用
    created() {
      console.log('created')
      this.initDicList()
    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
      initDicList(currentPage = 1) {
        getDicList({
          pageNo: currentPage,
          pageSize: this.pageSize,
          code: this.filters.code
        }).then(response => {
          this.total = response.data.total
          this.dicList = response.data.records
        })
      },
      openDialog(id) {
        if (!id) {
          this.title = '添加字典'
        } else {
          this.title = '编辑字典'
        }
        this.modalInit(id)
      },
      dicDetail(id) {
        if (!id) {
          this.dicForm = {}
        } else {
          getDicDetail(id).then(response => {
            this.dicForm = response.data
          })
        }
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchSaveDic()
          } else {
            return false
          }
        })
      },
      // 结束
      fetchSaveDic() {
        saveDic(this.dicForm).then(response => {
          this.$message({
            message: `${this.title}成功消息`,
            type: 'success'
          })
          this.initDicList()
          this.close()
        })
      },
      close() {
        this.dialogFormVisible = false
      },
      modalInit(id) {
        this.dialogFormVisible = true
        this.dicDetail(id)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel='stylesheet/scss'>

</style>
