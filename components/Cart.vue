<template>
  <client-only>
    <aside class="cart">
      <h1 class="cart__title">Cart</h1>
      <ul class="cart__list">
        <li v-for="(item, index) in $store.getters.cart" :key="index" class="cart__list-item">
          {{ item.quantity }}x {{ item.title }}
        </li>
      </ul>
      <a v-if="$store.getters.checkoutUrl" :href="$store.getters.checkoutUrl">Checkout</a>
    </aside>
  </client-only>
</template>

<style lang="scss" scoped>
.cart {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 40rem;
  background: #eee;
}
</style>
