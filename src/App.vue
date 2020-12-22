<template>
  <!-- id 与下面的 css 绑定 -->
  <div id="app">
    <head>
      <meta name="referrer" content="no-referrer"/>
    </head>
    <router-view/>
    <!--router view 表示在 index.js 声明的视图会嵌入到这里-->

  </div>
</template>

<script>
export default {
  name: 'App',
  sockets: {
    message: function (data) {
      this.$notify.info(decodeURI(data));

    }
  },
  created() {
    this.$socket.emit('loginWeb', 'Zhang Xueyou');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
