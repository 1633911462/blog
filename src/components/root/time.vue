<template>
  <div>
    <!-- 修改框 -->
          <el-dialog title="修改信息" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogFormVisible1">
          <el-form :model="text" status-icon ref="text" class="demo-ruleForm" :rules="rules">
          <el-form-item label="日志" prop="title" :label-width="formLabelWidth">
            <el-input v-model="text.title" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="bj">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 发布框 -->
        <el-button type="primary" @click="dialogFormVisible = true">发送</el-button>
        <el-dialog title="时间轴" :visible.sync="dialogFormVisible">
    <el-form :model="form"  status-icon  class="demo-ruleForm" :rules="rules" ref="form">
      <el-form-item label="日志" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
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
      label="标题">
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
        return callback(new Error('日志不能超过10个字'))
      }
      callback()
    }
    return {
      // 修改信息的弹出框
      dialogFormVisible1: false,
      labelPosition: 'right',
      // 修改表单的实时数据
      text: {
        title: ''
      },
      // 表格列表数据
      tableData: [],
      // 发布信息的弹出框
      dialogFormVisible: false,
      // 发布信息的实时数据
      form: {
        title: ''
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  // 初始数据
  async created () {
    await new Promise((resolve, reject) => {
      this.axios.get(this.ip + '/timeList').then((res) => {
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
      const time = `${year}-${month}-${day} ${h}:${s}:${m}`
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
          this.axios.post(this.ip + '/timeAdd', this.form).then((res) => {
            resolve(1)
          })
        })
        this.form = {}
        await new Promise((resolve, reject) => {
          this.axios.get(this.ip + '/timeList').then((res) => {
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
        this.axios.post(this.ip + '/timeUpdate', this.text)
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
        this.axios.post(this.ip + '/timeDel', this.tableData[i]).then((res) => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          resolve(1)
        })
      })
      this.tableData.splice(i, 1)
    }
  }
}
</script>

<style>
</style>
