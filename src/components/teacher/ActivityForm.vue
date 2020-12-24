<template>
  <div style="float: none">
    <div class="left-div">
      <el-form ref="form" :model="sizeForm" label-width="120px" size="medium" style="width: 500px">
        <el-form-item label="活动ID">
          <el-input :disabled="true" v-model="sizeForm.activityID" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="sizeForm.activityTitle" style="width:100%"></el-input>
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
          <el-input :disabled="true" type="textarea" autosize v-model="activityComment">
          </el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">重新提交</el-button>
          <el-button type="cancel" @click="onCancel">取消操作</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-div">
      <div style="float: left">
        <img alt="活动海报" :src="sizeForm.imageURL" style="border-radius: 20px; max-height: 500px; max-width: 600px"/>
      </div>
      <div style="float: right; margin-left: 20px">
        <h3 style="margin-top: 0;">活动简介</h3>
        <p style="max-width: 350px">{{ sizeForm.activityDescription }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ActivityForm',
  data() {
    return {
      sizeForm: {
        imageURL: "111",
        activityType: "111",
        activityTitle: "111",
        activityDescription: "111",
        startTime: "2021-01-01 12:00:00",
        endTime: "2021-01-01 14:00:00",
        activityPlace: "",
        activityCreator: "",
        activityID: "",
      },
      activityComment: '',
      currentFeedbackID: -1,
      currentIndex: 0,
    };
  },
  methods: {
    onSubmit() {
      this.sizeForm.startTime = new Date(this.sizeForm.startTime).getTime();
      this.sizeForm.endTime = new Date(this.sizeForm.endTime).getTime();
      // console.log(JSON.stringify(this.sizeForm));
      this.$axios
        .post('/activity/update', JSON.stringify(this.sizeForm), {
          headers: {'Content-Type': 'application/json;charset=UTF-8'}
        })
        .then((res) => {
          console.log(res);
        });

      // 重新提交了，把这条反馈删除
      this.$axios.get('/feedback/delete?feedbackID=' + this.currentFeedbackID).then((res) => {
        console.log(res.data);
      })
      this.$msgbox.alert('重新提交成功！');
      this.$parent.handleChildFormSubmit(this.currentIndex);
    },
    onCancel() {
      this.$parent.handleShowList();
    },
    setFormData(feedbackID, activity, comment, index) {
      this.currentFeedbackID = feedbackID;
      this.sizeForm = activity;
      this.activityComment = comment;
      this.currentIndex = index;
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
