<template>
    <div>
        <div class="index_left">
            <div class="wx_title">
                <h3>{{list[0].title}}</h3>
                <p class="small">作者发表于 {{list[0].date}} | 分类于 {{list[0].type}}</p>
                <hr>
                <p class="text" v-html="list[0].text"></p>
                <div class="bottom" v-if="list[1]"><router-link :to="left"><i class="el-icon-d-arrow-left"></i>{{list[1].title}}</router-link></div>
                <div class="bottom1" v-if="list[2]"><router-link :to="right">{{list[2].title}}<i class="el-icon-d-arrow-right"></i></router-link></div>
            </div>
        </div>
        <right></right>
    </div>
</template>

<script>
import right from '@/components/right'
export default {
  components: { right },
  data () {
    return {
      // list[0]当前页面  [1]上一页 [2]下一页
      list: [],
      left: '',
      right: ''
    }
  },
  methods: {
    xxy (vm_) {
      var vm = vm_ || this
      vm.axios.post(this.ip + '/select', { _id: vm.$route.params.id }).then((i) => {
        vm.list = i.data
        console.log(vm.list)
        if (vm.list[1]) {
          vm.left = `/xx/${vm.list[1]._id}`
        }
        if (vm.list[2]) {
          vm.right = `/xx/${vm.list[2]._id}`
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.xxy(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.xxy()
  }
}
</script>

<style lang="less">
 .wx_title{
     padding: 2rem;
     min-height: 600px;
     position: relative;
      font-size: 2.5rem;
      height:auto;
      color:dimgray;
      background: #fff;
     .small, .text, hr{
        margin-top:2rem;
      }
      .small{
        font-size:1.2rem;
      }
      h3{
        color:#000;
      }
      .text{
        color:#000;
        font-size:1.4rem;
        text-indent: 2em;
        margin-bottom:5rem;
        line-height: 2.5rem;
      }
      .bottom{
        position:absolute;
        bottom:1rem;
        left:1rem;
        clear: both;
        font-size: 1.6rem;
        a{
          color:cornflowerblue;
          text-decoration: none;
        }
      }
      .bottom1{
        position:absolute;
        bottom:1rem;
        right:1rem;
        clear: both;
        font-size: 1.6rem;
        a{
          color:cornflowerblue;
          text-decoration: none;
        }
      }
 }
 @media screen and (max-width: 600px){
   .wx_title{
     margin-top:1rem
   }
 }
</style>
