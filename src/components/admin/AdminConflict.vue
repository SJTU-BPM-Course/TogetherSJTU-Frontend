<template>
  <div v-if="showActivityPreview === false">
    <h2 style="float: left;">
      <i class="el-icon-check"></i>
      存在冲突的活动
    </h2>
    <el-table
      :data="pendingList"
      :row-class-name="conflictColoring"
      style="width: 100%; text-align: center">
      <el-table-column label="活动ID" width="100" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activityID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动申请人" width="100" style="text-align: center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activityCreator }}</span>
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
              <el-tag size="medium" @click="handleReview(scope.$index, scope.row)">{{
                  scope.row.activityTitle
                }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="220" style="text-align: center" align="center">
        <template slot-scope="scope">
          <!--          <i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="220" style="text-align: center" align="center">
        <template slot-scope="scope">
          <!--          <i class="el-icon-time"></i>-->
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
            icon="el-icon-success"
            size="small"
            type="success"
            v-bind:disabled="passButtonDisabled[scope.$index] || rejectBtnDisabled[scope.$index]"
            @click="handlePass(scope.$index, scope.row)">
            {{ passButtonDisabled[scope.$index] === true ? '已通过' : '通过' }}
          </el-button>
          <el-button
            icon="el-icon-error"
            size="small"
            type="danger"
            v-bind:disabled="rejectBtnDisabled[scope.$index] || passButtonDisabled[scope.$index]"
            @click="handleReject(scope.$index, scope.row)">
            {{ rejectBtnDisabled[scope.$index] === true ? '已拒绝' : '拒绝' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else style="text-align: left; float: left">
    <span @click="showConflictList">
      <h2><i class="el-icon-back"></i>活动预览</h2>
    </span>
    <div>
      <ActivityForm ref="AdminActivityForm"></ActivityForm>
    </div>
  </div>
</template>

<script>
import ActivityForm from "./ActivityForm";

export default {
  name: "AdminConflict",
  components: {ActivityForm},
  data() {
    return {
      pendingList: [],
      passButtonDisabled: [],
      rejectBtnDisabled: [],
      showActivityPreview: false
    }
  },
  methods: {
    formatDate(time) {
      let temp = new Date(time);
      return temp.toLocaleString('en-US');
    },
    conflictColoring({row, rowIndex}) {
      if (row.activityStatus === -100) {
        return 'conflict1';
      } else if (row.activityStatus === -200) {
        return 'conflict2';
      }
      return '';
    },
    showConflictList() {
      this.showActivityPreview = false;
    },
    handleReject(index, row) {
      this.rejectBtnDisabled.splice(index, 1, true);
      this.$axios.post('/activity/reject', {
        activityID: row.activityID,
        comment: "在该活动的时间段内，" + row.activityPlace + "有其他活动进行。"
      }).then((res) => {
        console.log('reject ret =', res.data);
      });

    },
    handleReview(index, row) {
      console.log(index, row);
      this.showActivityPreview = true;

      setTimeout(() => {
        this.$refs.AdminActivityForm.setFormData(row);
      })

    },
    handlePass(index, row) {
      console.log('handlePass', index, row);
      this.passButtonDisabled.splice(index, 1, true);
      this.$axios
        .get('/activity/setReviewStatus?actid=' + row.activityID + '&status=1')
        .then((response) => {
          console.log(response.data);
          if (response.data === true) {
            console.log('hello');
            this.passButtonDisabled.splice(index, 1, true);
            console.log(this.passButtonDisabled);
          }
        });
    },

  },
  mounted() {
    this.$axios
      .get('/activity/getByStatus?status=-100', {})
      .then((response) => {
        var data = response.data;
        for (let item of data) {
          item.startTime = this.formatDate(item.startTime);
          item.endTime = this.formatDate(item.endTime);
        }
        this.pendingList = this.pendingList.concat(data);
      });
    this.$axios
      .get('/activity/getByStatus?status=-200', {})
      .then((response) => {
        var data = response.data;
        for (let item of data) {
          item.startTime = this.formatDate(item.startTime);
          item.endTime = this.formatDate(item.endTime);
        }
        this.pendingList = this.pendingList.concat(data);
      });
  }
}
</script>

<style>
.el-table .conflict1 {
  background: lightsteelblue;
}

.el-table .conflict2 {
  background: lightpink;
}
</style>
