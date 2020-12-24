<template>
  <div v-if="showList === true">
    <h2 style="float: left;">
      <i class="el-icon-check"></i>
      审核未通过的活动
    </h2>
    <el-table
      :data="feedbackList"
      style="width: 100%; text-align: center">
      <el-table-column label="活动ID" width="100" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activity.activityID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" width="350" style="text-align: center" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <div>
              <div style="">
                <img :src="scope.row.activity.imageURL"
                     style="float: left; width: 200px; height: 180px; border-radius: 10px">
                <div style="float: left; width: 200px; padding-left: 20px">
                  <h4 style="margin-top: 0px;">活动简介</h4>
                  <p>{{ scope.row.activity.activityDescription }}</p>
                </div>
              </div>
              <div style="">
                <p>开始时间：
                  <el-tag>{{ scope.row.activity.startTime }}</el-tag>
                </p>
                <p>结束时间：
                  <el-tag>{{ scope.row.activity.endTime }}</el-tag>
                </p>
                <p>活动地点：
                  <el-tag type="success">{{ scope.row.activity.activityPlace }}</el-tag>
                </p>
              </div>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" @click="handleReview(scope.$index, scope.row)">{{
                  scope.row.activity.activityTitle
                }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="反馈意见" width="auto" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="auto" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="small"
            type="success"
            :disabled="buttonsState[scope.$index] !== STATE_NORMAL"
            @click="handleReview(scope.$index, scope.row)">
            {{ buttonsState[scope.$index] === STATE_SUBMIT ? '已修改' : '重新修改' }}
          </el-button>
          <el-button
            icon="el-icon-delete"
            size="small"
            type="danger"
            :disabled="buttonsState[scope.$index] !== STATE_NORMAL"
            @click="handleGiveup(scope.$index, scope.row)">
            {{ buttonsState[scope.$index] === STATE_GIVEUP ? '已放弃' : '放弃申请' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else style="text-align: left; float: left">
    <span @click="handleShowList  ">
      <h2><i class="el-icon-back"></i>  活动详细信息</h2>
    </span>
    <div>
      <ActivityForm ref="AdminActivityForm"></ActivityForm>
    </div>
  </div>
</template>

<script>
import ActivityForm from "./ActivityForm";

export default {
  name: "TeacherFeedback",
  components: {ActivityForm},
  data() {
    return {
      STATE_NORMAL: 'NORMAL',
      STATE_SUBMIT: 'SUBMIT',
      STATE_GIVEUP: 'GIVEUP',
      showList: true,
      feedbackList: [],
      buttonsState: [],
    }
  },
  methods: {
    formatDate(time) {
      let temp = new Date(time);
      return temp.toLocaleString('en-US');
    },
    handleReview(index, row) {
      this.showList = false;
      console.log('handle review', row.feedbackID);
      setTimeout(() => {
        this.$refs.AdminActivityForm.setFormData(row.feedbackID, row.activity, row.comment, index);
      });
    },
    handleGiveup(index, row) {
      // 删除记录
      this.$axios.get('/feedback/delete?feedbackID=' + row.feedbackID).then((res) => {
        console.log(res.data);
      });
      // 删除活动
      this.$axios.get('/activity/delete?actid=' + row.activityID).then((res) => {
        console.log(res.data);
      });
      this.buttonsState.splice(index, 1, this.STATE_GIVEUP);
    },
    handleShowList() {
      this.showList = true;
    },
    handleChildFormSubmit(index) {
      this.showList = true;
      this.buttonsState.splice(index, 1, this.STATE_SUBMIT);
    },
  },
  mounted() {
    this.$axios.get('/feedback/getAll', {}).then((res) => {
      this.feedbackList = res.data;
      this.feedbackList.forEach(value => {
        value.activity.startTime = this.formatDate(value.activity.startTime);
        value.activity.endTime = this.formatDate(value.activity.endTime);
      });
      console.log(this.feedbackList);
      var len = this.feedbackList.length;
      for (var i = 0; i < len; ++i) {
        this.buttonsState.push(this.STATE_NORMAL);
      }
    });
  }
}
</script>

<style scoped>

</style>
