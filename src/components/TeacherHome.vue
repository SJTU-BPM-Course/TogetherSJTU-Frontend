<template>
  <div>
    <NavMenu></NavMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from "./NavMenu";
export default {
  name: "TeacherHome",
  components: {NavMenu}
}
</script>

<style scoped>

</style>
