<template>
  <div v-if="fund" class="fund-details">
    <h1>{{ fund.name }}</h1>
    <img :src="fund.logo" alt="Fund Logo" width="100" class="fund-logo" />
    <p>Description: {{ fund.description }}</p>
    <p>Manager: {{ fund.fund_manager }}</p>
    <p>Risk: {{ fund.risk }}</p>
    <p>Custodian: {{ fund.custodian }}</p>
    <p>Composition: {{ fund.composition }}</p>
    <p>Performance:</p>
    <ul>
      <li v-for="perf in fund.performance" :key="perf.year">
        Year: {{ perf.year }}, Return: {{ perf.annual_return }}
      </li>
    </ul>
  </div>
  <div v-else class="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useFundsStore } from "../store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FundDetails",
  setup() {
    const store = useFundsStore();
    const router = useRouter();
    const fund = ref(null);

    onMounted(async () => {
      await store.fetchFunds();
      const id = router.currentRoute.value.params.id;
      fund.value = store.funds.find((f) => f.id === id);
    });

    return {
      fund,
    };
  },
});
</script>

<style scoped>
.fund-details {
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
</style>