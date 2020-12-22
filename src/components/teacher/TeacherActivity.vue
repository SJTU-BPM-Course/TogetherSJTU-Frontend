<template>
  <div>
    <h1>教师：活动页面</h1>
    <div v-if="viewState==='list'">
    <el-table
      :data="activities"
      style="width: 100%;text-align: center">
      <el-table-column
        prop="activityTitle"
        label="活动名称"
      min-width="15%">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始日期"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束日期"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="activityPlace"
        label="地址"
        min-width="15%">
      </el-table-column>
      <el-table-column
        label="活动签到"
        min-width="15%">
        　　　　<template slot-scope="scope">
        　　　　　　<el-button @click="switchQrPage(scope.row)">生成二维码</el-button>
        　　　　</template>
      </el-table-column>
    </el-table>
    </div>
    <div v-else>
      <el-row>
      <qrcode :options="{ width: 400 } " v-bind:value="JSON.stringify(qrData)"></qrcode></el-row>
      <el-row>
      <el-button @click="switchListPage()">返回列表页</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
var axios = require('axios')
export default {
  name: "TeacherActivity",
  data() {
    return {
      activities: [],
      viewState:"list",
      qrData:{}
    }
  },methods:{
    formatDate(time){
      let temp = new Date(time);
      return temp.toLocaleString('zh-Hans-CN');
    },
    switchListPage(){
      this.viewState = 'list';
    },
    switchQrPage(a){
      axios.get("http://47.103.222.155:8443/api/activity/getQRCodeData?actid="+a.activityID.toString()).then(
        (response)=>{
          console.log(response.data);
          this.viewState = 'qr';
          this.qrData = {activityID:response.data.activityID,md5:response.data.md5};
        }
      )
    }
  }
  ,
  mounted() {
    axios.get("http://47.103.222.155:8443/api/flutter/getUserActivities?userid=4").then(
(response)=>{
        console.log(response);
        this.activities = response.data;
        for(let i of this.activities){
          i.startTime = this.formatDate(i.startTime);
          i.endTime = this.formatDate(i.endTime);
        }
      }
    )
  }
}
</script>

<style scoped>

</style>
