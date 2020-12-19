<template>
  <div>
    <el-menu :default-active="currentPath"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-basketball"></i>
          <span slot="title">我的活动</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/teacherAdmin/newActivity">发布活动</el-menu-item>
          <el-menu-item index="1-1">我的发布</el-menu-item>
          <el-menu-item index="1-2">我的参加</el-menu-item>
          <!--          <el-menu-item index="1-3">我的审核</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-bag-1"></i>
          <span slot="title">我的圈子</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-0">新建圈子</el-menu-item>
          <el-menu-item index="2-1">我的发布</el-menu-item>
          <el-menu-item index="2-2">我的参加</el-menu-item>
          <!--          <el-menu-item index="2-3">我的审核</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-house"></i>
        <span slot="title">我的班级</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
  height: 100%;
}
</style>
