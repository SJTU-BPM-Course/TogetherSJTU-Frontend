<template>
  <div>
    <Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./Navigation";

export default {
  name: "AdminHome",
  components: {Navigation}
}
</script>

<style scoped>

</style>
