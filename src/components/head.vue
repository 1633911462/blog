<template>
  <div id="head">
      <router-link to="/root"><img id="tx" src="@/assets/tx.jpg" alt=""></router-link>
      <h1>池予的博客</h1>
      <p>这是一个中二半吊子码农分享学习经验和生活的网站...</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  #head{
    width: 100%;
    height: 50%;
    background-size: cover;
    text-align: center;
    background-image: url(../assets/bg.jpg);
    #tx{
        border-radius: 50%;
        width:12%;
        margin-top:2%;
        user-select: none;
        -webkit-user-drag: none;
    }
    h1{
        color: #fff;
        margin-top:1%;
    }
    p{
        display: block;
        width: 40%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background:#fff;
        opacity:0.5;
        box-shadow: 0 0 3rem #333;
        margin:1% auto;
        font-size: 1.4rem;
    }
  }
  @media screen and (min-width: 600px) {
    #head{
        height: 360px;
        #tx{
            width:12%;
        }
        P{
          width: 40%;
        }
    }
  }
  @media screen and (max-width: 600px) {
    #head{
      height: 180px;
      #tx{
          width:20%;
      }
      P{
        width: 90%;
        font-size: 1.2rem;
        margin-top: 1rem;
      }
    }
  }
</style>
