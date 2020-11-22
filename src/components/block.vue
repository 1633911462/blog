<template>
  <div class="box" ref="box" @click="close()">池予
  <i class="el-icon-circle-close"></i></div>
</template>

<script>
import block from './block.js'
export default {
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$refs.box.style.display = 'none'
    }
  },
  mounted () {
    block()
  }
}
</script>

<style scoped="scoped">
  *{
    margin: 0;
    padding:0;
  }
  .el-icon-circle-close{
    position: absolute;
    right: 0;
    top:0;
  }
  .box{
    background-color:cornflowerblue;
    font-size: 20px;
    width: 100px;
    border-radius: 50%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    user-select: none;
    position: fixed;
    z-index: 99999999999999;
  }
</style>
