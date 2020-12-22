<template>
  <div style="float: none">
    <div class="left-div">
      <el-form ref="form" :model="sizeForm" label-width="120px" size="medium" style="width: 500px">
        <el-form-item label="活动名称">
          <el-input v-model="sizeForm.activityID" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="sizeForm.activityTitle" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="发起人">
          <el-input v-model="sizeForm.activityCreator" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="sizeForm.activityPlace"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col>
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sizeForm.startTime"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col>
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sizeForm.endTime"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-input v-model="sizeForm.activityType"></el-input>
        </el-form-item>
        <el-form-item label="海报URL">
          <el-input v-model="sizeForm.imageURL"></el-input>
        </el-form-item>
        <el-form-item label="反馈意见">
          <el-input type="textarea" autosize placeholder="请输入反馈意见或者活动不合规的地方" v-model="activityComment">
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">提出反馈</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-div">
      <img :src="sizeForm.imageURL" style="border-radius: 20px; max-height: 500px; max-width: 800px"/>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      sizeForm: {
        imageURL: "",
        activityType: "",
        activityTitle: "",
        activityDescription: "",
        startTime: "2021-01-01 12:00:00",
        endTime: "2021-01-01 14:00:00",
        activityPlace: "",
        activityCreator: "",
        activityID: "",
        // ---
      },
      activityComment: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.sizeForm.activityID, this.activityComment);
    },
    setFormData(obj) {
      this.sizeForm = obj;
    }
  }
};
</script>

<style scoped>
.left-div {
  float: left;
}

.right-div {
  float: right;
  margin-left: 80px;
}
</style>
