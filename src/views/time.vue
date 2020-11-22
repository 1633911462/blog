<template>
  <div id="time">
      <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      color="#0bbd87"
      :timestamp="activity.date">
      {{activity.title}}
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reverse: true,
      activities: []
    }
  },
  // 初始数据
  async created () {
    await new Promise((resolve, reject) => {
      this.axios.get(this.ip + '/timeList').then((res) => {
        this.activities = res.data
        resolve(1)
      })
    })
  },
  mounted () {
    var dom = document.getElementById('time')
    dom.style.minHeight = window.innerHeight - dom.offsetTop - 50 + 'px'
  }
}
</script>

<style>
  @media screen and (min-width: 600px){
    #time{
      min-height: 600px !important;
    }
  }
  @media screen and (max-width: 600px){
    #time{
      padding: 2rem;
    }
  }
</style>
