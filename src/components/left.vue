<template>
    <!-- 左边 -->
      <div class="index_left">
        <!-- 分类 -->
        <div class="classify">
          <ion-icon name="folder-outline"></ion-icon>
          分类：<span><slot name="fl"></slot></span><span class="num">共有<slot name="num"></slot>个话题</span>
        </div>
        <!-- 话题列表 -->
        <div class="block" v-for="(i,j) in list" v-show="type == false" :key="j">
          <h3>{{i.title}}</h3>
          <p>作者发表于 {{i.date}} | 分类于 {{i.type}}</p>
          <hr>
          <p class="text">{{i.sketch}}</p>
          <div class="button" @click="go(i)">点击阅读 »</div>
        </div>
        <div class="block" v-for="(i,j) in list" v-show="i.type == type" :key="j">
          <h3>{{i.title}}</h3>
          <p>作者发表于 {{i.date}} | 分类于 {{i.type}}</p>
          <hr>
<p class="text">{{i.sketch}}</p>
          <div class="button" @click="go(i)">点击阅读 »</div>
        </div>
      </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    },
    type: {
      // type: String,
      default: false
    }
  },
  methods: {
    go (i) {
      this.$router.replace(`/xx/${i._id}`)
    }
  }
}
</script>
<style lang="less">
  .index_left{
    float:left;
    width:65%;
  }
.classify{
      // width:100%;
      padding: 2rem;
      font-size: 2.5rem;
      height:auto;
      color:dimgray;
      background: #fff;
      .num{
        float: right;
        color: dimgray;
      }
      span{
        color:#000;
      }
 }
 .block{
      // width:100%;
      height:auto;
      background: #fff;
      margin-top:20px;
      padding:1rem;
      h3{
        font-size: 2.4rem;
        color:#555;
      }
      p, hr, .button{
        margin-top: 2rem;
      }
        .text{
        font-size:1.5rem;
      }
      .button{
        width: 15%;
        margin: 2rem auto;
        height: 40px;
        line-height: 40px;
        border: 1px solid #009688;
        background: #009688;
        text-align: center;
        font-size: 1.4rem;
      }
      .button:hover{
        background: #fff;
        cursor: pointer;
      }
    }
    @media screen and (max-width: 600px){
      .index_left{
      }
      .classify{
            padding: 2rem 2rem 2rem 1rem;
            font-size: 1.4rem;
            margin-top: 1rem;
            line-height: 2rem;
            .num{
              // float: left;
            }
       }
       .block{
            margin-top:10px;
            h3{
              font-size: 2rem;
            }
            p, hr, .button{
              margin-top: 1rem;
            }
              .text{
              font-size:1.2rem;
            }
            .button{
              width: 50%;
              margin: 1rem auto;
              font-size: 1.2rem;
            }
          }
    }
</style>
