<template>
  <div>
    <el-menu
      :default-active="currentPath"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="#0366d6"
      style="min-width: 1300px; min-height: 70px;">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="font-size: 20px">
        {{ item.navItem }}
      </el-menu-item>
      <img src="@/assets/sjtu64x64.png" style="position: absolute; right: 58%">
      <span
        style="position: absolute;padding-top: 20px;right: 43%;font-size: 30px;font-weight: bold">Together SJTU</span>
      <el-input
        placeholder="快速搜索"
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px; position:absolute; margin-top: 12px; right: 18%"
        v-model="keywords">
      </el-input>
      <el-button type="primary" style="position: absolute; margin-top:12px; right: 12%;">搜索</el-button>
      <el-dropdown split-button type="primary" style="position: absolute; margin-top: 12px; right: 0%;">
        肖战（教务处）
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>圈子</el-dropdown-item>
          <el-dropdown-item>活动</el-dropdown-item>
          <el-dropdown-item>班级</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Navgation',
  data() {
    return {
      keywords: '',
      currentPath: '/adminPending',
      navList: [
        {name: '/adminPending', navItem: '待审核'},
        // {name: '/adminPending', navItem: '待审核'},
        // {name: '/adminPending', navItem: '待审核'},
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
