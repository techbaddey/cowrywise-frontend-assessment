<template>
  <div>
    <h1>List of Funds</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-for="fund in fundsFiltered" :key="fund.id">
        <router-link :to="{ name: 'FundDetails', params: { id: fund.id } }">
          {{ fund.name }}
        </router-link>
        <p>Returns: {{ fund.returns }}</p>
        <p v-if="fund.is_money_market">Asset Type: Money Market</p>
        <p v-else>Asset Type: Other</p>
        <p>Fund Manager: {{ fund.fund_manager }}</p>
        <p>Risk Level: {{ fund.risk }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from '../store'

export default {
  name: 'FundList',
  setup() {
    const store = useStore()
    const isLoading = ref(true)

    const fetchFunds = async () => {
      try {
        await store.fetchFunds()
      } catch (error) {
        console.error('Error fetching funds:', error)
      } finally {
        isLoading.value = false
      }
    }

    fetchFunds()

    const funds = computed(() => store.funds)

    // Filter out funds with null 'id' property
    const fundsFiltered = computed(() => funds.value.filter(fund => fund && fund.id))

    return { funds: fundsFiltered, isLoading }
  }
}
</script>
