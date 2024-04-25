<template>
    <div>
      <label for="riskLevel">Filter by Risk Level:</label>
      <select v-model="selectedRisk" @change="filterFunds">
        <option value="">All</option>
        <option v-for="level in riskLevels" :key="level" :value="level">{{ level }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from '../store'
  
  export default {
    name: 'FilterBar',
    setup() {
      const store = useStore()
      const selectedRisk = ref('')
      const riskLevels = [1, 2, 3, 4, 5]
  
      const filterFunds = () => {
        if (selectedRisk.value === '') {
          store.fetchFunds() 
        } else {
          store.funds = store.funds.filter(fund => fund.risk === parseInt(selectedRisk.value))
        }
      }
  
      return { selectedRisk, riskLevels, filterFunds }
    }
  }
  </script>
  