import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import AppIndex from "../home/AppIndex";
import Login from "../components/Login";
import App from "../App";
import TeacherHome from "../components/teacher/TeacherHome";
import TeacherIndex from "../components/teacher/TeacherIndex";
import TeacherActivity from "../components/teacher/TeacherActivity";
import ActivityCalendar from "../components/teacher/ActivityCalendar";
import TeacherDummy from "../components/teacher/TeacherDummy";
import TeacherAdmin from "../components/teacher/TeacherAdmin";
import ActivityForm from "../components/teacher/ActivityForm";
import AdminHome from "../components/admin/AdminHome";
import AdminPending from "../components/admin/AdminPending";
import AdminConflict from "../components/admin/AdminConflict";
import TeacherFeedback from "../components/teacher/TeacherFeedback";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 默认进入 hello world
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/teacherHome',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      redirect: '/login'
    },
    {
      path: '/adminHome',
      name: 'AdminHome',
      component: AdminHome,
      children: [
        {
          path: '/adminPending',
          name: 'AdminPending',
          component: AdminPending
        },
        {
          path: '/adminConflict',
          name: 'AdminConflict',
          component: AdminConflict
        }
      ]
    },
    {
      path: '/teacherHome',
      name: 'TeacherHome',
      component: TeacherHome,
      children: [
        {
          path: '/teacherIndex',
          name: 'TeacherIndex',
          component: TeacherIndex
        },
        {
          path: '/teacherActivity',
          name: TeacherActivity,
          component: TeacherActivity
        },
        {
          path: '/activityCalendar',
          name: ActivityCalendar,
          component: ActivityCalendar
        },
        {
          path: '/teacherFeedback',
          name: 'TeacherFeedback',
          component: TeacherFeedback
        },
        {
          path: '/teacherAdmin',
          name: TeacherAdmin,
          component: TeacherAdmin,
        },
        {
          path: '/teacherDummy',
          name: TeacherDummy,
          component: TeacherDummy
        },

      ]
    }


  ]
})
