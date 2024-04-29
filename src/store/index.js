import { defineStore } from 'pinia';

export const useFundsStore = defineStore({
  id: 'funds',
  state: () => ({
    funds: [],
  }),
  actions: {
    async fetchFunds() {
      const response = await fetch('https://dashboard.cowrywise.com/api/v2/funds/public/');
      const data = await response.json();
      this.funds = data.data;
    },
  },
});

export default useFundsStore;
