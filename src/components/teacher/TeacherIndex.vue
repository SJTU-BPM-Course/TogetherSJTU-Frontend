<template>
  <div>
    <head>
      <meta name="referrer" content="no-referrer"/>
    </head>
    <h2>热门活动</h2>
    <el-carousel :interval="4000" type="card" height="500px" width="100%">
<!--      <el-carousel-item v-for="item in this.activityList" :key="item.activityID">-->
<!--        <h2 style="position: absolute; color: white;">{{ item.activityTitle }}</h2>-->
<!--        <img :src="item.imageURL"/>-->
<!--      </el-carousel-item>-->
      <el-carousel-item>
        <img src="@/assets/activity-image-1.png"/>
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/activity-image-2.png"/>
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/activity-image-3.png"/>
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/activity-image-4.png"/>
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/background.jpg"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "TeacherIndex",
  data() {
    return {
      activityList: [],
    }
  },
  mounted() {
    this.getActivityInfo();
  },
  methods: {
    getActivityInfo() {
      this.$axios
        .get('/activity/getAll', {
          params: {},
        })
        .then((res) => {
          this.activityList = res.data;
          this.activityList.forEach(function (value) {
            console.log(value);
          });
        })
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
