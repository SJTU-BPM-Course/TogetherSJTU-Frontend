<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
    <i class="el-icon-menu" style="float:right;font-size: 40px;color: #222;padding-top: 8px"></i>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Together SJTU</span>
    <img src="../assets/sjtu64x64.png" style="padding-left: 50px;"></img>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      navList: [
        {name: '/teacherHome', navItem: '首页'},
        {name: '/teacherHome', navItem: '活动'},
        {name: '/teacherHome', navItem: '圈子'},
        {name: '/teacherHome', navItem: '实习/招聘'},
        {name: '/teacherHome', navItem: '客户端'},
      ]
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}
</style>
