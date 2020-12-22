<template>
  <div v-if="showFeedback === false">
    <h2 style="float: left;">
      <i class="el-icon-check"></i>
      待审核活动
    </h2>
    <el-table
      :data="pendingList"
      style="width: 100%; text-align: center">
      <el-table-column label="活动ID" width="100" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activityID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" width="350" style="text-align: center" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <div>
              <img :src="scope.row.imageURL" style="float: left; width: 200px; height: 180px; border-radius: 10px">
              <div style="float: left; width: 200px; padding-left: 20px">
                <h4 style="margin-top: 0px;">活动简介</h4>
                <p>{{ scope.row.activityDescription }}</p>
              </div>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.activityTitle }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="220" style="text-align: center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="220" style="text-align: center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动地点" width="220" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activityPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-check"
            size="small"
            type="success"
            v-bind:disabled="buttonDisabled[scope.$index]"
            @click="handlePass(scope.$index, scope.row)">{{ buttonDisabled[scope.$index] === true ? '已通过' : '通过' }}
          </el-button>
          <el-button
            icon="el-icon-edit"
            size="small"
            type="danger"
            @click="handleReview(scope.$index, scope.row)">反馈
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else style="text-align: left; float: left">
    <span @click="showUnreviewedList">
      <h2><i class="el-icon-back"></i> 反馈</h2>
    </span>
    <div>
      <ActivityForm ref="AdminActivityForm"></ActivityForm>
    </div>
  </div>
</template>

<script>
import ActivityForm from "./ActivityForm";

export default {
  name: "AdminPending",
  components: {ActivityForm},
  data() {
    return {
      pendingList: [],
      buttonDisabled: [],
      showFeedback: false,
    }
  },
  mounted() {
    this.$axios
      .get('/activity/getUnreviewed', {})
      .then((response) => {
        console.log(response.data);
        this.pendingList = response.data;
        for (let x of this.pendingList) {
          this.buttonDisabled.push(false);
          x.startTime = this.formatDate(x.startTime);
          x.endTime = this.formatDate(x.endTime);
        }
      });
  },
  methods: {
    showUnreviewedList() {
      this.showFeedback = false;
    },
    handleReview(index, row) {
      console.log(index, row);
      this.showFeedback = true;

      setTimeout(() => {
        this.$refs.AdminActivityForm.setFormData(row);
        // this.$refs.AdminActivityForm.setFormData(row.activityID, row.activityTitle, row.activityPlace,
        //   row.startTime, row.endTime, row.activityType);
      })

    },
    handlePass(index, row) {
      console.log('handlePass', index, row);
      this.$axios
        .get('/activity/setReviewStatus?actid=' + row.activityID + '&status=1')
        .then((response) => {
          console.log(response.data);
          if (response.data === true) {
            console.log('hello');
            this.buttonDisabled.splice(index, 1, true);
            console.log(this.buttonDisabled);
          }
        });

    },
    formatDate(time) {
      let temp = new Date(time);
      return temp.toLocaleString('en-US');
    }
  }
}
</script>

<style scoped>

</style>
