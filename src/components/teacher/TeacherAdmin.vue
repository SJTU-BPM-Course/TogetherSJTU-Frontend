<template>
  <div>
    <div class="left-sidebar">
      <AdminSidebar></AdminSidebar>
    </div>
    <div class="right-content">
      <ActivityForm></ActivityForm>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "./AdminSidebar";
import ActivityForm from "./ActivityForm";

export default {
  name: "TeacherAdmin",
  components: {ActivityForm, AdminSidebar}
}
</script>

<style scoped>
.left-sidebar{
  float: left;
}
.right-content{
  float: left;
  margin-top: 20px;
  margin-top: 20px;
}
</style>
