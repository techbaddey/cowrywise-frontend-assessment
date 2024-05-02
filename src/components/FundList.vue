<template>
  <div class="fund-list">
    <h1>Investment Funds</h1>
    <div class="filter-container">
      <label>Filter Funds by: </label>
      <select v-model="selectedRisk" class="form-select">
        <option value="">All Risks</option>
        <option v-for="risk in risks" :value="risk" :key="risk">
          {{ risk }}
        </option>
      </select>
    </div>
    <div class="fund-list-container">
      <div v-if="loading" class="loading-spinner">
        <svg viewBox="0 0 24 24">
          <circle
            class="loading-spinner-circle"
            cx="12"
            cy="12"
            r="12"
            fill="none"
            stroke-width="4"
            stroke="#337ab7"
          />
        </svg>
      </div>
      <div v-else>
        <div v-for="fund in filteredFunds" :key="fund.id" class="fund-item">
          <router-link
            :to="{ name: 'FundDetails', params: { id: fund.id } }"
            class="fund-link"
          >
            <img
              :src="fund.logo"
              alt="Fund Logo"
              width="50"
              class="fund-logo"
            />
            <span
              ><h2>{{ fund.name }}</h2></span
            >
          </router-link>
          <p><b>Returns:</b> {{ fund.returns }}</p>
          <p><b>Asset Type:</b> {{ formatAssetTypes(fund.composition) }}</p>
          <p><b>Manager:</b> {{ fund.fund_manager }}</p>
          <p><b>Risk:</b> {{ fund.risk }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useFundsStore } from "../store";

export default defineComponent({
  name: "FundList",
  setup() {
    const store = useFundsStore();
    const funds = ref([]);
    const selectedRisk = ref("");
    const risks = ["1", "2", "3"];
    const loading = ref(true);

    onMounted(async () => {
      await store.fetchFunds();
      funds.value = store.funds;
      loading.value = false;
    });

    const filteredFunds = computed(() => {
      if (!selectedRisk.value) return funds.value;
      return funds.value.filter(
        (fund) => fund.risk.toString() === selectedRisk.value
      );
    });

    // Function to format asset types for display
    const formatAssetTypes = (composition) => {
      return Object.entries(composition)
        .map(([assetType, percentage]) => `${assetType}: ${percentage}%`)
        .join(", ");
    };

    return {
      funds,
      selectedRisk,
      risks,
      filteredFunds,
      loading,
      formatAssetTypes,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono&display=swap");

.fund-list {
  font-family: "Space Mono", monospace;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-spinner-circle {
  animation: loading-spinner 1s linear infinite;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.form-select {
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.fund-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.fund-item {
  flex-basis: 30%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.fund-link {
  text-decoration: none;
  color: #337ab7;
}

.fund-logo {
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
}

h1 {
  text-align: center;
  color: #022b69;
}

@media (max-width: 768px) {
  .fund-list-container {
    flex-direction: column;
  }
  .fund-item {
    flex-basis: 100%;
    margin-bottom: 20px;
  }
}
</style>
