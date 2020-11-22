<template>
  <div>
    <!-- 修改框 -->
          <el-dialog title="修改信息" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogFormVisible1">
          <el-form :model="text" status-icon ref="text" class="demo-ruleForm" :rules="rules">
          <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
            <el-input v-model="text.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="简述" prop="sketch" :label-width="formLabelWidth">
            <el-input v-model="text.sketch" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="text" :label-width="formLabelWidth">
            <el-input v-model="text.text" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="分类" prop="type" :label-width="formLabelWidth">
            <el-select v-model="text.type" placeholder="请选择类别">
              <el-option label="慢生活" value="慢生活"></el-option>
              <el-option label="学无止境" value="学无止境"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="bj">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 发布框 -->
        <el-button type="primary" @click="dialogFormVisible = true">发布</el-button>
        <el-dialog title="发布" :visible.sync="dialogFormVisible">
    <el-form :model="form"  status-icon  class="demo-ruleForm" :rules="rules" ref="form">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="简述" status-icon :label-width="formLabelWidth" prop="sketch">
        <el-input v-model="form.sketch" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth" prop="text">
        <el-input v-model="form.text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" placeholder="请选择类别">
          <el-option label="慢生活" value="慢生活"></el-option>
          <el-option label="学无止境" value="学无止境"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="no">取 消</el-button>
      <el-button type="primary" @click="add(form)">确 定</el-button>
    </div>
  </el-dialog>

<!-- 表格布局 -->
      <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="sketch"
      label="简述"
      :show-overflow-tooltip="true"
      style="height:50px"
      >
    </el-table-column>
    <el-table-column
      prop="text"
      label="内容"
      :show-overflow-tooltip="true"
      style="height:50px"
      >
    </el-table-column>
    <el-table-column
      prop="type"
      label="类别"
      >
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="250">
    </el-table-column>
      <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="update(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" @click="del(scope.$index,scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标题不能为空'))
      }
      if (value.length > 10) {
        return callback(new Error('标题字符不能超过10个'))
      }
      callback()
    }
    var checkSketch = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('简述不能为空'))
      }
      callback()
    }
    var checkText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'))
      }
      callback()
    }
    var checkType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('分类不能为空'))
      }
      callback()
    }
    return {
      // 修改信息的弹出框
      dialogFormVisible1: false,
      labelPosition: 'right',
      // 修改表单的实时数据
      text: {
        title: '',
        sketch: '',
        text: '',
        type: ''
      },
      // 表格列表数据
      tableData: [],
      // 发布信息的弹出框
      dialogFormVisible: false,
      // 发布信息的实时数据
      form: {
        title: '',
        sketch: '',
        text: '',
        type: '',
        date: ''
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ],
        sketch: [
          { validator: checkSketch, trigger: 'blur' }
        ],
        text: [
          { validator: checkText, trigger: 'blur' }
        ],
        type: [
          { validator: checkType, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  // 初始数据
  async created () {
    await new Promise((resolve, reject) => {
      this.axios.get(this.ip + '/list').then((res) => {
        this.tableData = res.data
        resolve(1)
      })
    })
  },
  methods: {
    // 计算当前的时间
    getTime () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var h = date.getHours()
      var m = date.getSeconds()
      var s = date.getMinutes()
      const time = `${year}/${month}/${day} ${h}:${s}:${m}`
      return time
    },
    // 发布新的内容
    add (formName) {
      if (JSON.parse(localStorage.demo)) {
        this.dialogFormVisible = false
        return this.$message.error('测试账号暂无该权限哦')
      }
      this.$refs.form.validate(async (valid) => {
        if (valid) {
        } else {
          return false
        }
        this.dialogFormVisible = false
        var time = this.getTime()
        this.form.date = time
        // 将表单数据发送给服务器
        await new Promise((resolve, reject) => {
          this.axios.post(this.ip + '/add', this.form).then((res) => {
            resolve(1)
          })
        })
        this.form = {}
        await new Promise((resolve, reject) => {
          this.axios.get(this.ip + '/list').then((res) => {
            this.tableData = res.data
            this.$message({
              message: '发布成功',
              type: 'success'
            })
            resolve(1)
          })
        })
      })
    },
    // 取消发布新的内容
    no () {
      this.dialogFormVisible = false
      this.form = {}
    },
    // 编辑按钮
    update (i, row) {
      if (JSON.parse(localStorage.demo)) {
        return this.$message.error('测试账号暂无该权限哦')
      }
      this.dialogFormVisible1 = true
      this.text = row
    },
    // 确定修改内容
    bj () {
      this.$refs.text.validate((valid) => {
        if (valid) {
        } else {
          return false
        }
        this.dialogFormVisible1 = false
        this.axios.post(this.ip + '/update', this.text)
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
      })
    },
    // 删除按钮
    async del (i, row) {
      if (JSON.parse(localStorage.demo)) {
        return this.$message.error('测试账号暂无该权限哦')
      }
      await new Promise((resolve, reject) => {
        this.axios.post(this.ip + '/del', this.tableData[i]).then((res) => {
          resolve(1)
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
      })
      this.tableData.splice(i, 1)
    }
  }
}
</script>

<style>
  @media screen and (max-width: 600px){
    .el-dialog{
      width: 90% !important;
    }
  }
</style>
