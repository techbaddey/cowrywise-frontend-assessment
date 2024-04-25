<template>
    <div v-if="fund">
      <h2>{{ fund.name }}</h2>
      <p>Description: {{ fund.description }}</p>
      <p>Composition: {{ fund.composition }}</p>
      <p>Custodian: {{ fund.custodian }}</p>
      <p>Performance: {{ fund.performance }}</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from '../store'
  
  export default {
    name: 'FundDetails',
    props: ['id'],
    setup(props) {
      const store = useStore()
  
      const fund = computed(() => store.funds.find(f => f.id === props.id))
  
      return { fund }
    }
  }
  </script>
  