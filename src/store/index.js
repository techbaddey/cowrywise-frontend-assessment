import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    funds: [],
    error: null
  }),
  actions: {
    async fetchFunds() {
      try {
        const response = await axios.get('https://dashboard.cowrywise.com/api/v2/funds/public/')
        console.log('Funds data:', response.data) 
        this.funds = response.data
        this.error = null // Reset error if successful
      } catch (error) {
        console.error('Error fetching funds:', error)
        this.error = error.message // Store error message
      }
    }
  }
})
