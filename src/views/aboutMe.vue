<template>
  <div id="aboutMe">
    <div class="index_left">
      <div class="aboutText">
        <div class="title">关于自己</div>
        <div class="text">一个学生，跟很多00后IT同龄人一样，喜欢折腾，喜欢研究。互联网领域的知识是学无止境的，每个人都在一步步的追随着各种新的技术，get各种新的技能来提升自身能力。</div>
<div class="text">失去野心的人，看不见新世界</div>
      </div>
      <div class="aboutText">
        <div class="title">本站在用</div>
        <div class="text">前端：html5、css3、less、JavaScript、vue、axios</div>
        <div class="text">后端：node、express</div>
        <div class="text">数据库：mongodb</div>
      </div>
      <div class="aboutText" style="text-align: center;">
        <div class="title">我的公众号</div>
          <img width="50%" src="@/assets/wxMe.jpg" alt="池予">
      </div>
    </div>
    <right></right>
  </div>
</template>

<script>
import right from '@/components/right'
export default {
  components: { right }
}
</script>

<style lang="less">
  .aboutText{
      height:auto;
      color:dimgray;
      background: #fff;

      .title{
        background:#fbfbfb;
         border-left: 4px solid #009688;
         box-sizing: border-box;
        width: 100%;
        height:40px;
        color:#000;
        // font-weight: bold;
        font-size:2.5rem;
        text-align: center;
        line-height: 40px;
      }
      .text{
        font-size:1.6rem;
        padding: 2rem;
        line-height: 3rem;
        text-indent: 2em;
      }
  }
  @media screen and (max-width: 600px){
    .aboutText{
      margin-top:1rem;
        .text{
          font-size:1.2rem;
          line-height: 2.5rem;
        }
    }
  }
</style>
