<template>
  <div id="index2">
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="0" disabled>后台管理系统</el-menu-item>
  <el-menu-item  disabled></el-menu-item>
  <el-menu-item  disabled></el-menu-item>
  <el-menu-item  disabled></el-menu-item>
  <el-menu-item v-if="ipone"  disabled></el-menu-item>
  <el-menu-item v-if="ipone"  disabled></el-menu-item>
    <el-menu-item index="1" @click="bg('news')">发布</el-menu-item>
    <el-menu-item index="2" @click="bg('timeY')">时间轴</el-menu-item>
    <el-menu-item index="3" @click="bg('message')">留言</el-menu-item>
    <el-menu-item index="5" @click="bg('/')">博客</el-menu-item>
    <el-menu-item index="4" @click="bg('/login')">退出</el-menu-item>
</el-menu>
<component :is="key"></component>

  </div>
</template>

<script>
import news from '@/components/root/text.vue'
import timeY from '@/components/root/time.vue'
import message from '@/components/root/message.vue'
export default {
  components: { news, timeY, message },
  data () {
    return {
      activeIndex: '1',
      key: 'news',
      list: '',
      ipone: window.innerWidth < 600
    }
  },
  mounted () {
    window.onresize = (a) => {
      this.ipone = window.innerWidth < 600
    }
  },
  methods: {
    bg (i) {
      if (i === '/' || i === '/login') {
        return this.$router.push(i)
      }
      this.key = i
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.root) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style>
.el-badge__content.is-fixed{
  top:12px;
}
</style>
