<template>
  <div>
    <h1>当前所有日程</h1>
    <el-row type="flex">
      <el-col>
        <span>选择活动类别</span>
        <el-select v-model="typeFilter" @change="updateEvents()">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col>
        <span>选择学院</span>
        <el-select v-model="collageFilter" @change="updateEvents()">
          <el-option
            v-for="item in collageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGrid from '@fullcalendar/timegrid'
  const axios = require('axios')
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  name: "ActivityCalendar",
  data() {
    return {
      allEvents:[],
      typeFilter:'所有活动',
      collageFilter:'所有学院',
      typeOptions:[
        {value:'所有活动',label:'所有活动'},
        {value:'学术讲座',label:'学术讲座'},
        {value:'班级会议',label:'班级会议'},
        {value:'社团活动',label:'社团活动'},
        {value:'体育活动',label:'体育活动'},
      ],
      collageOptions:[
        {value:'所有学院'},
        {value:'软件学院'},
        {value:'机电学院'},
        {value:'电子信息学院'},
      ],
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin,timeGrid ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        },
        initialView: 'dayGridMonth',
        events:[
        ],
        eventColor:'blue'
      }
    }
  },
  mounted() {
    axios.get('http://47.103.222.155:8443/api/flutter/getAllActivities').then(
      (response)=>{

        let eduEvents = [{activityCollege:'软件学院',activityType:'教学活动',activityTitle:'习题课',
          startTime: new Date(2020,11,5,12),
          endTime: new Date(2020,11,5,14)},
          {activityCollege:'软件学院',activityType:'教学活动',activityTitle:'考试周',
            startTime: new Date(2020,11,27,0),
            endTime: new Date(2020,12,2,24)},
          {activityCollege:'软件学院',activityType:'教学活动',activityTitle:'政治课',
            startTime: new Date(2020,11,6,12),
            endTime: new Date(2020,11,6,16)},
          {activityCollege:'软件学院',activityType:'教学活动',activityTitle:'政治课',
            startTime: new Date(2020,11,13,12),
            endTime: new Date(2020,11,13,16)}
          ];
        this.allEvents = response.data.concat(eduEvents);
        let temp = this.allEvents.map(a=>{return a.activityCollege}).filter((item, index, array) => {
          return array.indexOf(item) === index;
        });

        this.collageOptions = [{value:'所有学院'}].concat(temp.map(a=>{return {value:a}}));
        this.updateEvents();
      }
    )
  },
  methods:{
    updateEvents(){
      let colorType = {"学术讲座":'blue',"班级会议":"pink","社团活动":"red","体育活动":"green",'教学活动':"grey"};

      let filteredEvents = this.allEvents.filter(a=>this.typeFilter==="所有活动"||a.activityType===this.typeFilter).
      filter(a=>this.collageFilter==='所有学院'||a.activityCollege===this.collageFilter);
      if(this.collageFilter==='所有学院'){
        filteredEvents = filteredEvents.filter(a=>a.activityType!=="教学活动")
      }
      this.calendarOptions.events = filteredEvents.map(a=>{return {title:a.activityTitle,
        start:a.startTime, end:a.endTime, color:colorType[a.activityType]}});

    },
  }

}
</script>

<style scoped>

</style>
