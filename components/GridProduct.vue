<template>
  <nuxt-link tag="div" :to="'/products/' + product.handle" class="grid__item">
    <p class="item__price">{{ product.variants[0].price }}€</p>
    <img :src="thumbnail" class="item__thumbnail" />
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
  props: {
    product: { type: Object, required: true } as PropOptions<ShopifyBuy.Product>,
  },
  computed: {
    // Return the first image, or a placeholder
    thumbnail(): string {
      const img = this.product.images[0];
      if (img === undefined) {
        return 'https://via.placeholder.com/512';
      }
      return img.src;
    },
  },
});
</script>

<style lang="scss" scoped>
.grid__item {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.item__thumbnail {
  width: 100%;
  height: 100%;
}

.item__price {
  position: absolute;
  margin: 0;
  padding: 1rem 1.5rem;
  bottom: 1rem;
  left: 1rem;
  background: #fff;
  border-radius: 2.5rem;
  box-shadow: 0 0 0.75rem 0 rgba($color: #000, $alpha: 0.15);
}
</style>
