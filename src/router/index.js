import { createRouter, createWebHistory } from 'vue-router'
import FundList from '../components/FundList.vue'
import FundDetails from '../components/FundDetails.vue'

const routes = [
  {
    path: '/',
    name: 'FundList',
    component: FundList
  },
  {
    path: '/fund/:id',
    name: 'FundDetails',
    component: FundDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
