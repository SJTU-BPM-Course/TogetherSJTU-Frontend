<template>
  <div>
    <h2 style="float: left;">
      <i class="el-icon-check"></i>
      存在冲突的活动
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
            icon="el-icon-check"
            size="small"
            type="success"
            v-bind:disabled="passButtonDisabled[scope.$index] || feedbackBtnDisabled[scope.$index]"
            @click="handlePass(scope.$index, scope.row)">
            {{ passButtonDisabled[scope.$index] === true ? '已通过' : '通过' }}
          </el-button>
          <el-button
            icon="el-icon-edit"
            size="small"
            type="danger"
            v-bind:disabled="feedbackBtnDisabled[scope.$index] || passButtonDisabled[scope.$index]"
            @click="handleReview(scope.$index, scope.row)">
            {{ feedbackBtnDisabled[scope.$index] === true ? '已反馈' : '反馈' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminConflict",
  date() {
    return {
      pendingList: [],
      passButtonDisabled: [],
      feedbackBtnDisabled: [],
    }
  }
}
</script>

<style scoped>

</style>
