<template>
  <div>
    <router-view></router-view>
    <NavMenu></NavMenu>
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
