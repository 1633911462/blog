<template>
  <div id="login" :style="bg">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button type="primary" style="margin-left: 2rem;" @click="open()">注册</el-button>
  </el-form-item>
</el-form>
<div class="zzc"></div>
<div id="wx" ref="wx" >
  <img id="wx_item" width="100%" src="@/assets/wx.png" alt="">
  <i class="el-icon-close" @click="closeWx()"></i>
</div>
  </div>
</template>

<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      bg: {
        backgroundImage: 'url(' + require('@/assets/iu.jpg') + ')'
      },
      ruleForm: {},
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeWx () {
      document.getElementsByClassName('zzc')[0].style.display = 'none'
      this.$refs.wx.style.display = 'none'
    },
    open () {
      document.getElementsByClassName('zzc')[0].style.display = 'block'
      this.$refs.wx.style.display = 'block'
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
        // 校检完毕，登录检查
        if (this.ruleForm.name === 'admin' && this.ruleForm.pass === 'chiyu') {
          this.$message({
            showClose: true,
            message: '恭喜你，登录成功',
            type: 'success'
          })
          this.ruleForm = {}
          localStorage.root = true
          localStorage.demo = false
          this.$router.replace('/root')
        } else if (this.ruleForm.name === 'demo' && this.ruleForm.pass === '123456') {
          // 该账号是测试账号
          this.$message({
            showClose: true,
            message: '恭喜你，登录成功',
            type: 'success'
          })
          this.ruleForm = {}
          localStorage.root = false
          localStorage.demo = true
          this.$router.replace('/root')
        } else {
          this.$message({
            message: '用户名或密码错误',
            type: 'warning'
          })
          this.ruleForm = {}
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .zzc{
    width: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 99;
    height: 100%;
    background-color: #000;
    display: none;
    opacity: 0.5;
  }
  #wx{
    display: none;
    position: relative;
    z-index: 999999999999999;
    width: 50%;
    margin: 1rem auto;
    #wx_item{
      display: block;
    }
    i{
      position: absolute;
      right: 0;
      z-index: 9999;
      top:0;
      color:#fff;
      font-size: 3rem;
    }
  }
    form{
        transform: translate(-60% ,-50%) !important;
    }
    #login{
    width: 100%;
    height: 100%;
    background-size:cover;
    form{
      width:400px;
      height:200px;
      position: relative;
      top:50%;
      left:50%;
      transform: translate(-60% ,50%);
      .yzm{
        user-select: none;
        font-size:30px;
        font-style: italic;
        width:80px;
        height:40px;
        margin-top:10px;
        border:1px solid #ccc;
        text-align: center;
        line-height: 40px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
    }
  }
  @media screen and (max-width: 600px){
    #login{
      background-size: contain;
      form{
        width:300px;
        height:200px;
      }
    }
    #wx{
      width: 80%;
      margin: 8rem auto;
    }
  }
</style>
