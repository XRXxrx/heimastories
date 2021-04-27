<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="jump">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 导航栏 -->
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in catelist" :key="value.id">
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          loading-text="玩命加载中"
          finished-text="没有更多了"
          :offset="5"
          :immediate-check="true"
          @load="onLoad"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <mypost v-for="v in value.postlist" :key="v.id" :post="v"></mypost>
          </van-pull-refresh> </van-list
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import mypost from "@/components/hm_post";
import { postList } from "@/apis/post";
import { getCateInfo } from "@/apis/category";
export default {
  components: {
    mypost,
  },
  data() {
    return {
      // 当前被激活项的索引值:这个索引值就对应着数据在数组中的索引
      // 这个项目在打开首页之后，应该让“头条”栏目默认被选中，如果登陆了，有了关注，那么active=1，否则 active=0
      active: localStorage.getItem("heima_token") ? 1 : 0,
      catelist: [], // 所有栏目数据
      // postlist: [], // 栏目的新闻数据
    };
  },
  async mounted() {
    // 实现栏目管理的入口 添加
    // 细节：要使得箭头函数，否则this的指向变了
    document.querySelector(".van-sticky").onclick = (e) => {
      //说明点击的位置是入口位置
      //有bug,如果不是从最顶部（滚动条距顶部为0）开始点击，那么e.target.className获取到的不是van-sticky
      // if (e.target.className === "van-sticky") {
      //解决
      if (e.target.className.indexOf("van-sticky") !== -1) {
        this.$router.push({ name: "cateManager" });
      }
    };
    //首页加载之后，先读取本地存储中的栏目数据--加载用户定制数据
    this.catelist = JSON.parse(localStorage.getItem("cateList") || "[]");
    if (this.catelist.length === 0) {
      //获取所有栏目数据
      let res = await getCateInfo();
      console.log(res);
      // 这个数据现在只有 id  name  is_top，并没有存储新闻数据的数组
      this.catelist = res.data.data;
    } else {
      // 有本地存储数据，那么就需要手动的添加 “关注”和“头条”
      if (localStorage.getItem("heima_token")) {
        this.catelist.unshift(
          { id: 0, name: "关注", is_top: 1 },
          { id: 999, name: "头条", is_top: 1 }
        );
      } else {
        this.catelist.unshift({ id: 999, name: "头条", is_top: 1 });
      }
    }
    //数据改造，添加存放栏目内容数据的位置
    this.catelist = this.catelist.map((v) => {
      return {
        ...v,
        postlist: [], //为当前栏目所添加的用于存储这个栏目的新闻数据的数组
        pageIndex: 1, // 当前栏目的当前页码
        pageSize: 20, // 当前栏目的每页所显示的数量
        loading: false, //当前组件的上拉加载的状态
        finished: false, //当前组件的数据是否全部加载完毕的标记
        isLoading: false, // 当前组件的下拉刷新的状态，标记是否正在下拉刷新
      };
    });
    // 页面一加载获取当前被默认激活栏目的新闻数据
    this.getpost();
  },
  //监听active的变化
  watch: {
    async active() {
      // 如果当前栏目的postlist有数据，则不用再发请求
      if (this.catelist[this.active].postlist.length === 0) {
        this.getpost();
      }
    },
  },
  methods: {
    //点击个人中心图标进行跳转
    jump() {
      //如果有id就跳回个人中心页,没有id就跳回登录页
      let id = localStorage.getItem("userid");
      if (id) {
        this.$router.push({ path: `/personal/${id}` });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    //下拉刷新处理函数
    onRefresh() {
      setTimeout(() => {
        // 页码重新设置为1
        this.catelist[this.active].pageIndex = 1;
        // 将数据清空
        this.catelist[this.active].postlist.length = 0;
        // 将之前可能重置为true的finished状态重置为false
        this.catelist[this.active].finished = false;
        this.getpost();
      }, 1000);
    },
    // 上拉加载下一页数据
    onLoad() {
      // 加载下一页数据：就是将当前栏目的页码+1，重新发起axios请求
      this.catelist[this.active].pageIndex++;
      setTimeout(() => {
        this.getpost();
      }, 1000);
    },
    //封装获取新闻数据
    async getpost() {
      // 根据当前的Active获取到数据在数组中的索引，通过索引获取栏目id
      // this.cateList[this.active]：获取当前被激活项的栏目数据
      // this.cateList[this.active].id：获取栏目id
      // console.log(this.active);
      // let id = this.catelist[this.active].id;
      // console.log(id);
      // let a = await postList(id);
      // console.log(a);
      //获取栏目的新闻数据
      // this.postlist = (await postList(id)).data.data;
      // console.log(this.postlist);
      // 将数据存储在当前栏目对象的postlist数组中,如果已经发送过请求的就不用重复发送了，直接从获取栏目数据的数组中调用，减轻业务
      let current = (
        await postList({
          category: this.catelist[this.active].id, // 传递当前栏目的id
          pageIndex: this.catelist[this.active].pageIndex, // 传递当前栏目的pageIndex
          pageSize: this.catelist[this.active].pageSize, // 传递当前栏目的pageSize
        })
      ).data.data;
      // 将获取到的新闻数据存储到当前栏目的postlist数组中
      this.catelist[this.active].postlist.push(...current);
      // 本次请求完成之后，将loading重置为false,以便下一次上拉
      this.catelist[this.active].loading = false;
      // 本次请求完成之后，将下拉刷新折状态重置为false,以便下一次下拉刷新
      this.catelist[this.active].isLoading = false;
      // 判断数据是否已全部加载完毕：我要求20条数据，结果返回的数量小于20，说明真没有数据了
      if (current.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  /deep/ .van-sticky {
    // 入口预留空间
    padding-right: 44px;
    &::before {
      // 入口文本内容
      content: "+";
      position: absolute;
      width: 51px;
      height: 44px;
      background-color: #fff;
      top: 0;
      right: 0;
      text-align: center;
      line-height: 42px;
      font-size: 35px;
    }
  }
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f00;
    padding: 0 10px;
    .iconnew {
      font-size: 50px;
      color: #fff;
    }
    .search {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.548);
      border-radius: 25px;
      color: #fff;
      padding: 10px 0;
      margin: 0 15px;
    }
    .user {
      font-size: 23px;
      color: #fff;
    }
  }
}
</style>