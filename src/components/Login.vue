<template>
  <body id="poster">
  <img src="../assets/sjtu200x200.png">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h1 class="login_title">SJTU Together</h1>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #0366d6;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'root',
        password: '123'
      },
      responseResult: []
    }
  },
  methods: {
    login() {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.push({path: '/teacherHome'})
            }
          }
        )
        .catch(failResponse => {
          console.log(failResponse.data.code);
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

/*#poster {*/
/*  background: url("../assets/background.jpg") no-repeat;*/
/*  background-position: center;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  background-size: cover;*/
/*  position: fixed;*/
/*}*/

body {
  margin: 0px;
}


</style>
