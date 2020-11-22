<template>
  <div>

<!-- 表格布局 -->
      <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="昵称"
      width="250">
    </el-table-column>
    <el-table-column
      prop="text"
      label="内容"
      >
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
       width="250"
      >
    </el-table-column>
      <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" @click="del(scope.$index,scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格列表数据
      tableData: []
    }
  },
  // 初始数据
  async created () {
    await new Promise((resolve, reject) => {
      this.axios.get(this.ip + '/listMsg').then((res) => {
        this.tableData = res.data
        resolve(1)
      })
    })
  },
  methods: {
    // 删除按钮
    async del (i, row) {
      if (JSON.parse(localStorage.demo)) {
        return this.$message.error('测试账号暂无该权限哦')
      }
      await new Promise((resolve, reject) => {
        this.axios.post(this.ip + '/msgDel', this.tableData[i]).then((res) => {
          this.$message({
            message: '删除留言成功！',
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
