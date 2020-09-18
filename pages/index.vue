<template>
  <div class="wrapper">
    <div class="grid">
      <GridProduct v-for="(product, index) in products" :key="index" :product="product"></GridProduct>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  async asyncData({ $shopify }) {
    return {
      products: await $shopify.product.fetchAll(),
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20rem 0;
}

.grid {
  max-width: 90rem;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
}

.grid::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid .grid__item:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
</style>
