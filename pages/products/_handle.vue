<template>
  <div class="wrapper">
    <div class="product">
      <h1 class="product__title">{{ product.title }}</h1>
      <p class="product__path">
        <nuxt-link to="/">Products</nuxt-link> &gt; {{ product.productType }} &gt; {{ product.title }}
      </p>
      <div class="product__description" v-html="product.descriptionHtml"></div>
      <div class="product__images">
        <img v-for="(image, imageIndex) in product.images" :key="imageIndex" :src="image.src" />
      </div>
      <br />
      <button @click="addToCart()">Add to Cart</button>
      <button>Buy Now</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface PageData {
  product: ShopifyBuy.Product;
}

export default Vue.extend({
  async asyncData({ $shopify, params, error }): Promise<Partial<PageData>> {
    let product;
    try {
      product = await $shopify.product.fetchByHandle(params.handle);
    } catch {
      error({ statusCode: 500, message: 'Something went wrong...' });
    }
    if (product === null) {
      error({ statusCode: 404, message: 'Item not found' });
    }

    return {
      product,
    };
  },
  data() {
    return {} as Partial<PageData>;
  },
  methods: {
    addToCart() {
      if (this.product === undefined) {
        return;
      }
      this.$store.dispatch('addToCart', {
        variantId: this.product.variants[0].id,
        quantity: 1,
      } as ShopifyBuy.LineItemToAdd);
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.product {
  max-width: 90rem;
  margin: 0 auto;
}

.product__path {
  font-weight: 700;
}

a {
  color: inherit;
  text-decoration: none;
}

.product__description {
  text-align: justify;
}

.product__images {
  display: flex;
  flex-wrap: nowrap;
  height: 25rem;
  overflow: hidden;
  overflow-x: auto;

  img {
    height: 100%;
    width: auto;
  }
}
</style>
