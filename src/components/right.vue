<template>
      <!-- 右边 -->
      <div class="index_right">
        <div class="me">
          <div class="me_me">
          </div>
          <div class="zzc">
            <img src="@/assets/tx.jpg" alt="">
            <p class="name">池予</p>
          </div>
          <div class="msg">性别：男</div>
          <div class="msg">职业：学生</div>
          <div class="msg">位居：江西省</div>
          <div class="msg" style="padding-bottom:1rem">QQ：1633911462</div>
        </div>
        <div class="block_r">
          <ion-icon name="leaf-sharp"></ion-icon>标签云/ <span class="eng">Tags</span>
          <hr>
          <div class="bq" @mouseout="out(j)" @mouseover="over(j)" ref="j" v-for="(i,j) in bqy" :key="j" :style="{background:i.bg}">{{i.name}}</div>
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      bqy: [
        {
          name: 'javascript',
          bg: 'green'
        },
        {
          name: 'html5',
          bg: 'yellow'
        },
        {
          name: 'css3',
          bg: 'pink'
        },
        {
          name: 'vue',
          bg: '#555'
        },
        {
          name: 'node',
          bg: '#666'
        },
        {
          name: 'express',
          bg: '#777'
        },
        {
          name: 'jquery',
          bg: '#888'
        },
        {
          name: 'react',
          bg: '#999'
        },
        {
          name: 'mongodb',
          bg: '#f56'
        },
        {
          name: 'GitHub',
          bg: '#520'
        }
      ]
    }
  },
  methods: {
    over (j) {
      this.$refs.j[j].classList.add('hover')
    },
    out (j) {
      this.$refs.j[j].classList.remove('hover')
    }
  }
}
</script>

<style lang="less">
.index_right{
    margin-left:3%;
    float:left;
    width:27%;
    .me{
          height:auto;
          background: #fff;
          font-size: 1.7rem;
          position: relative;
          .msg{
            padding-left: 2rem;
            margin-top: 1rem;
          }
          .zzc{
            height: 20rem;
          width: 100%;
          z-index: 9999;
          position:relative;
          img{
                  user-select: none;
                  margin:0 auto;
                  padding-top:4%;
                  border-radius: 50%;
                  width:42%;
                  display: block;
                  -webkit-user-drag: none;
          }
          .name{
            text-align: center;
            margin-top:1rem;
            color:#000;
            font-size:2.3rem;
          }
          }
          .me_me{
            position: absolute;
            z-index: 1;
          text-align: center;
          opacity:0.5;
          height: 20rem;
          width: 100%;
          background-position: center center;
          background-size: cover;
          background-image: url(../assets/tx.jpg);
    }
    }
    .block_r{
      height:auto;
      background: #fff;
      margin-top:20px;
      padding:1rem;
      font-size: 1.7rem;
      .eng{
        color: green;
      }
      .bq{
        max-width: 10rem;
        display: inline-block;
        padding: 0 1rem;
        margin-left:1rem;
        width: auto;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
      }
      .hover{
        background: rgb(101, 136, 250) !important;
        cursor: pointer;
      }
      hr, .bq{
        margin-top:2rem;
      }
    }
  }
  @media screen and (max-width: 600px){
    .index_right{
        margin-left:0.5rem;
        float:right;
        width:33%;
        margin-top: 1rem;
        .me{
              font-size: 1.2rem;
              .msg{
                padding-left: 1rem;
                margin-top: 0.5rem;
              }
              .zzc{
                height: 14rem;
              img{
                      padding-top:8%;
                      width:76%;
              }
              .name{
                margin-top:0.5rem;
              }
              }
              .me_me{
                height: 14rem;
        }
            }
            .block_r{
              margin-top:20px;
              padding:1rem;
              font-size: 1.2rem;
              .bq{
                max-width: 10rem;
                border-radius: 12px;
                padding: 0 0.2rem;
                margin-left:0.2rem;
              }
              hr, .bq{
                margin-top:1rem;
              }
            }
      }
  }
</style>
