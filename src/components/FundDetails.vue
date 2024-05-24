<template>
  <div v-if="fund" class="fund-details">
    <h1>{{ fund.name }}</h1>
    <img :src="fund.logo" alt="Fund Logo" width="100" class="fund-logo" />
    <p><b>Description:</b> {{ fund.description }}</p>
    <p><b>Manager:</b> {{ fund.fund_manager }}</p>
    <p><b>Risk:</b> {{ fund.risk }}</p>
    <p><b>Custodian:</b> {{ fund.custodian }}</p>
    <p><b>Composition:</b> {{ formatComposition(fund.composition) }}</p>
    <p><b>Performance:</b></p>
    <ul>
      <li v-for="perf in fund.performance" :key="perf.year">
        <b>Year:</b> {{ perf.year }}, <b>Return:</b> {{ perf.annual_return }}
      </li>
    </ul>
    <a href="/" class="link"><b>Go back to Investment Funds List</b></a>
  </div>
  <div v-else class="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useFundsStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "FundDetails",
  setup() {
    const store = useFundsStore();
    const route = useRoute();
    const fund = ref(null);

    onMounted(async () => {
      if (store.funds.length === 0) {
        await store.fetchFunds();
      }
      const id = route.params.id;
      fund.value = store.funds.find((f) => f.id === id);
    });

    const formatComposition = (composition) => {
      return Object.entries(composition)
        .map(([assetType, percentage]) => `${assetType}: ${percentage}%`)
        .join(", ");
    };

    return {
      fund,
      formatComposition,
    };
  },
});
</script>

<style scoped>
.fund-details {
  font-family: "Space Mono", monospace;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.fund-logo {
  width: 100px;
  height: 100px;
  margin: 0 10px;
  border-radius: 50%;
}

h1 {
  font-weight: 600;
  text-align: center;
  color: #337ab7;
}

p {
  font-weight: 300;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  color: #022b69;
}
</style>
