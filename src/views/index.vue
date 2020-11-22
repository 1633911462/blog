<template>
  <div id="index">
    <left :list="list"><span slot="fl">首页</span><slot slot="num">{{num}}</slot></left>
    <right></right>
  </div>
</template>

<script>
import left from '@/components/left'
import right from '@/components/right'
export default {
  components: { left, right },
  data () {
    return {
      list: [],
      num: 0
    }
  },
  // 初始数据
  async created () {
    await new Promise((resolve, reject) => {
      this.axios.get(this.ip + '/list').then((res) => {
        this.list = res.data
        this.num = this.list.length
        resolve(1)
      })
    })
  }
}
</script>

<style lang="less">
</style>
