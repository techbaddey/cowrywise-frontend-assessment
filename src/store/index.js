import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    funds: []
  }),
  actions: {
    async fetchFunds() {
      try {
        const response = await axios.get('https://dashboard.cowrywise.com/api/v2/funds/public/')
        console.log('Funds data:', response.data) // Log the response data
        this.funds = response.data
      } catch (error) {
        console.error('Error fetching funds:', error)
      }
    }
  }
})
