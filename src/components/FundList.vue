<template>
  <div>
    <img src="../assets/Cowrywise-Banner.png" alt="cowrywise logo" />
    <h1>Investment Funds</h1>
    <div class="loader-container" v-if="isLoading">
      <span class="loader"></span>
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
import { computed, ref } from "vue";
import { useStore } from "../store";

export default {
  name: "FundList",
  setup() {
    const store = useStore();
    const isLoading = ref(true);

    const fetchFunds = async () => {
      try {
        await store.fetchFunds();
      } catch (error) {
        console.error("Error fetching funds:", error);
      } finally {
        isLoading.value = false;
      }
    };

    fetchFunds();

    const funds = computed(() => store.funds);

    // Filter out funds with null 'id' property
    const fundsFiltered = computed(() =>
      funds.value.filter((fund) => fund && fund.id)
    );

    return { funds: fundsFiltered, isLoading };
  },
};
</script>

<style scoped>
img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 30px;
  width: 200px;
}
h1 {
  color: #022b69;
  text-align: center;
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 5px solid #0066f5;
  animation: prixClipFix 2s linear infinite;
}

.loader::after {
  border-color: #022b69;
  animation: prixClipFix 2s linear infinite, rotate 0.5s linear infinite reverse;
  inset: 6px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
