<template>
  <div>
    <el-form style="text-align: left">
      <el-form-item label="活动面向学院">
        <el-select v-model="form.college" placeholder="请选择活动面向学院">
          <el-option v-for="(item,i) in dataOptions.college" :key="i" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option v-for="item in dataOptions.type" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.place" placeholder="请选择活动区域">
          <el-option v-for="item in dataOptions.place" :value="item"></el-option>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="活动时间区间">-->
<!--        <el-col :span="5">-->
<!--          <el-date-picker type="date" placeholder="日期区间左" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
<!--        </el-col>-->
<!--        <el-col class="line" :span="1">-</el-col>-->
<!--        <el-col :span="5">-->
<!--          <el-date-picker type="date" placeholder="日期区间右" v-model="form.date2" style="width: 100%;"></el-date-picker>-->
<!--        </el-col>-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">智能推荐</el-button>
      </el-form-item>

      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="college"
            label="学院"
            width="180">
          </el-table-column>
          <el-table-column
            prop="place"
            label="地点"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="score"
            label="得分">
          </el-table-column>
        </el-table>
      </template>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "TeacherRecommend",
  data() {
    return {
      form: {
        college: "待定",
        type: '待定',
        date1:
          (()=>{let i = new Date().getTime(); return new Date(i-i%(1000*60*24*60)-28800000);})(),
        date2: (()=>{let i = new Date().getTime(); return new Date(i-i%(1000*60*24*60)-28800000);})(),
        place: "待定"
      },
      dataOptions:{
        place:["软件楼教室","社团活动室","体育馆","东上院教室","校外","待定"],
        college:["软件学院","数学学院","物理学院","待定"],
        type:[" 班级会议","体育活动","社团活动","待定"]
      },
      tableData:[],
      otherEvents:{

      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      let result = this.generateLists();
      let scoreList = result.map(a=>this.score(a));
      let temp = result.map((a,i)=>{return {place:a.place,college:a.college,type:a.type,score:scoreList[i]}});
console.log(temp);
      this.tableData = temp.sort((a,b)=>{return b.score -a.score}).slice(0,10);
      console.log(this.tableData);
    },
    score(a){
      let baseScore = 1;
      let placeIndex = this.dataOptions.place.indexOf(a.place);
      let collegeIndex = this.dataOptions.college.indexOf(a.college);
      let typeIndex = this.dataOptions.type.indexOf(a.type);
      let scorePlaceCollegeList=[[0.8,0.1,0.1],[0.3,0.3,0.3],[0.25,0.5,0.25],[0.2,0.4,0.4],[0.3,0.3,0.4],[0.2,0.1,0.7]];
      let scorePlaceType = [[1,0,0],[0,0,1],[0,0.7,0.3],[0.5,0,0.5],[0.1,0.4,0.5]];
      let scoreCollegeType = [[0.5,0.1,0.4],[0.4,0.3,0.3],[0.3,0.4,0.3]];
      let scorePlace = [0.1,0.3,0.3,0.2,0.1];
      let scoreCollege = [0.3,0.3,0.4];
      let scoreType = [0.2,0.4,0.4];
      console.log(placeIndex+' '+typeIndex+' '+collegeIndex);
      console.log(scorePlaceCollegeList[placeIndex][collegeIndex]);
      console.log(scorePlaceType[placeIndex][typeIndex]);
      console.log(scoreCollegeType[collegeIndex][typeIndex]);
      return baseScore*scorePlaceCollegeList[placeIndex][collegeIndex]*scorePlaceType[placeIndex][typeIndex]*
      scoreCollegeType[collegeIndex][typeIndex]*scorePlace[placeIndex]*scoreCollege[collegeIndex]*scoreType[typeIndex]*100;

    },
    generateLists(){
      let result = []
      let temp = {place:[],college: [],type:[],date:[]};
      temp.college = this.form.college==="待定"?this.dataOptions.college.filter(a=>a!=="待定"):[this.form.college];
      temp.place = this.form.place==="待定"?this.dataOptions.place.filter(a=>a!=="待定"):[this.form.place];
      temp.type = this.form.type === "待定"?this.dataOptions.type.filter(a=>a!=="待定"):[this.form.type]
      // for(let i = this.form.date1;i.getTime()<= this.form.date2.getTime();i=new Date(i.getTime()+1000*60*24*60)){
      //   console.log(i.getTime());
      //   console.log(this.form.date2.getTime());
      //   temp.date.push(i.toDateString()+"上午");
      //   temp.date.push(i.toDateString()+"下午");
      //   temp.date.push(i.toDateString()+"晚上");
      // }
      for(let place of temp.place){
        for(let college of temp.college){
          for(let type of temp.type){
              result.push({place:place,college: college,type:type});
          }
        }
      }
      return result;
    }

  }
}
</script>
