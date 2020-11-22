<template>
  <div id="study">
    <left :list="list" type="学无止境"><span slot="fl">学无止境</span><slot slot="num">{{num}}</slot></left>
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
        this.list.forEach(i => {
          if (i.type === '学无止境') {
            this.num++
          }
        })
        resolve(1)
      })
    })
  }
}
</script>

<style>

</style>
