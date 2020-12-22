<template>
  <div>
    <h1>当前所有日程</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  name: "ActivityCalendar",
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        events:[
          { title: 'event 1', date: '2020-12-01' ,color:'red'},
          { title: 'event 2', date: '2020-12-02' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
