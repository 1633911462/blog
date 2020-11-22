<template>
  <div id="message">
      <h2>留言</h2>
      <h4>留言板块</h4>
      <hr>
      <h3>留下你的评论</h3>
      <hr>
      <el-form :rules="rules" style="margin-top:2rem;" status-icon  label-width="100px" ref="formLabelAlign" class="demo-ruleForm"  :model="formLabelAlign">
  <el-form-item :label-width="formLabelWidth" prop="qq" label="QQ">
    <el-input v-model="formLabelAlign.qq"></el-input>
  </el-form-item>
  <el-form-item :label-width="formLabelWidth" prop="name" label="昵称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="text" :label-width="formLabelWidth">
    <el-input type="textarea" v-model="formLabelAlign.text"></el-input>
  </el-form-item>
</el-form>
<el-button type="primary" @click="dl()">提交</el-button>
<div class="plq">
  <h4>评论墙（共{{len}}条评论）</h4>
  <hr>
  <div class="pl" v-for="(i,j) in list" :key="j">
    <div class="left">
      <img :src="i.url" alt="">
      <div class="wz">
        <h3>{{i.name}}</h3>
        <h4>{{i.text}}</h4>
      </div>
      <div class="p">
        <p v-for="(n,m) in i.hf" :key="m">{{n.name}}：{{n.text}}</p>
      </div>
      <el-dialog title="回复留言" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" style="margin-top:2rem;" status-icon  label-width="100px" ref="formLabelAlign1" class="demo-ruleForm"  :model="formLabelAlign1">
  <el-form-item :label-width="formLabelWidth" prop="name" label="昵称">
    <el-input v-model="formLabelAlign1.name"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="text" :label-width="formLabelWidth">
    <el-input type="textarea" v-model="formLabelAlign1.text"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="ok()">确 定</el-button>
  </div>
</el-dialog>
    </div>
    <div class="right">
      <p>{{i.id}}楼 {{i.time}}</p>
      <el-button type="info"  @click="hf(j)" round size="mini">回复</el-button>
    </div>
    <div style="clear:both"></div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      }
      callback()
    }
    var checkText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'))
      }
      callback()
    }
    return {
      labelPosition: 'left',
      index: '',
      formLabelAlign: {
        qq: '',
        text: '',
        name: ''
      },
      formLabelAlign1: {
        text: '',
        name: ''
      },
      len: 0,
      dialogFormVisible: false,
      formLabelWidth: '50px',
      // 留言列表
      list: [
      ],
      rules: {
        text: [
          { validator: checkText, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.api()
  },
  methods: {
    async dl () {
      this.$refs.formLabelAlign.validate(async (valid) => {
        if (valid) {
        } else {
          return false
        }
        this.formLabelAlign.time = this.getTime()
        this.formLabelAlign.url = `https://q2.qlogo.cn/headimg_dl?dst_uin=${this.formLabelAlign.qq}&spec=100`
        await new Promise((resolve, reject) => {
          this.axios.post(this.ip + '/addMsg', this.formLabelAlign).then(() => resolve(1))
        })
        await new Promise((resolve, reject) => {
          this.api()
        })
      })
    },
    api () {
      this.axios.get(this.ip + '/listMsg').then(i => {
        this.list = i.data
        this.len = this.list.length
        for (var j in this.list) {
          this.list[j].id = parseInt(j) + 1
        }
        this.list.reverse()
        this.formLabelAlign = {}
      })
    },
    hf (j) {
      this.dialogFormVisible = true
      this.index = j
    },
    async ok () {
      if (this.formLabelAlign1.name === '' || this.formLabelAlign1.text === '') {
        return
      }
      this.dialogFormVisible = false
      this.formLabelAlign1._id = this.list[this.index]._id
      await new Promise((resolve, reject) => {
        this.axios.post(this.ip + '/updateMsg', this.formLabelAlign1)
          .then((i) => {
            this.formLabelAlign1 = {}
            resolve(1)
          })
      })
      await new Promise((resolve, reject) => {
        this.api().then(i => {
          resolve(1)
        })
      })
    },
    getTime () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var h = date.getHours()
      var s = date.getMinutes()
      const time = `${year}-${month}-${day} ${h}:${s}`
      return time
    }
  }
}
</script>

<style scoped lang="less">
  #message{
    h2{
    font-size:2.5rem;
    color: cornflowerblue;
    /* font-weight:normal */
  }
  h4{
    margin-top:0.5rem;
    color:cornflowerblue;
  }
  hr{
    margin-top:1rem;
    /* background:cornflowerblue; */
  }
  h3{
    margin-top:2rem;
    color:cornflowerblue;
  }
  .plq{
    margin-top:2rem;
    .pl{
      padding: 2rem 0;
      min-height:5rem;
      height:auto;
      margin-top:1rem;
      clear: both;
      // border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .left{
        margin-left: 2rem;
        float:left;
        img{
          border-radius: 50%;
          width:50px;
          float:left;
        }
        .p{
          padding-top: 1rem;
          clear:both;
          p{
            padding: 0 5rem;

          }
        }
        .wz{
          float:left;
          height: 50px;
          padding:0 1rem;
          h3{
            line-height: 0rem;
            color:#000;
            font-size:1.5rem;
          }
          h4{
            line-height: 3rem;
            color:#999;
          }
        }
      }
      .right{
        float:right;
        padding:0 1rem;
        text-align: right;
        button{
          margin-top: 1rem;
        }
      }
    }
  }
  @media screen and (min-width: 509px){
     .el-input{
       width:30rem !important;
     }
     .el-textarea{
       width:60rem !important;
     }
  }
  @media screen and (max-width: 600px){
    .el-input{
      width:20rem !important;
    }
    .el-textarea{
      width:25rem !important;
    }
  }
  }
</style>
