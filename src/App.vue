<template>
  <div id="app">
    <el-backtop></el-backtop>
    <block></block>
    <router-view name="root"></router-view>
    <router-view name="login"></router-view>
    <div v-if="use">
      <tou></tou>
    <div class="nav">
      <div class="logo"><router-link to="/"><img src="@/assets/logo.png" alt="池予的博客"></router-link></div>
      <div><router-link to="/life">慢生活</router-link></div>
      <div><router-link to="/study">学无止境</router-link></div>
      <div><router-link to="/time">时间轴</router-link></div>
      <div><router-link to="/aboutMe">关于我</router-link></div>
      <div><router-link to="/message">留言</router-link></div>
    </div>
    <div class="whole"><router-view></router-view></div>
    <div style="height: 50px;width: 100%;clear: both;"></div>
    <foot></foot>
    </div>
  </div>
</template>
<script>
import tou from '@/components/head.vue'
import foot from '@/components/foot.vue'
import block from '@/components/block.vue'
export default {
  components: { tou, foot, block },
  data () {
    return {
      use: ''
    }
  },
  created () {
    if (this.$route.name === 'root' || this.$route.name === 'login') {
      this.use = false
    } else {
      this.use = true
    }
  },
  watch: {
    $route: {
      handler (a, b) {
        if (a.name === 'root' || a.name === 'login') {
          this.use = false
        } else {
          this.use = true
        }
      }
    }
  }
}
</script>
<style lang="less">
  *{
      padding: 0;
      margin: 0;
  }
  html{
      font-size: 62.5%;
      background:#efefef;
  }
  html,body,#app{
    height:100%;
  }
  .nav{
    width:100%;
    height:60px;
    background:#fff;
    line-height: 60px;
    .logo{
      width: 128px;
      padding: 0 2rem 0 0;
    }
    div{
      width: auto;
      height: 100%;
      float:left;
      padding:0 2rem;
      font-size: 1.4rem;
      a{
        color:dimgray;
        text-decoration: none;
      }
    }
    div:hover a{
      color:#009688;
    }
  }
  .whole{
    width:75%;
    // min-height: 600px;
    height:auto;
    // background-color: red;
    margin: 3rem auto;
    // margin-top:30px;
  }
  @media screen and (max-width: 600px){
    .whole{
      margin: 0;
      width: 100%;
    }
    .nav{
      .logo{
        padding: 0 0.5rem 0 0;
      }
      div{
        padding:0 0.4rem;
        font-size: 1.1rem;
      }
    }
  }
</style>
