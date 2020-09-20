<template>
  <li class="cart__list-item">{{ item.quantity }}x {{ item.title }}</li>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  props: {
    item: { type: Object, required: true } as PropOptions<ShopifyBuy.LineItem>,
  },
});
</script>
