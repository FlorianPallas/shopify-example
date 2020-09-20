<template>
  <aside class="cart">
    <client-only>
      <h1 class="cart__title">Cart</h1>
      <ul class="cart__list">
        <CartItem v-for="(item, index) in $store.getters.cart" :key="index" :item="item"></CartItem>
      </ul>
      <a
        :class="{ disabled: $store.getters.checkoutUrl === undefined }"
        class="cart__button"
        :href="$store.getters.checkoutUrl"
        rel="noopener noreferrer"
        >Checkout</a
      >
    </client-only>
  </aside>
</template>

<style lang="scss" scoped>
.cart {
  position: fixed;
  z-index: 1000;
  padding: 4rem;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40rem;
  background: #eee;

  &__title {
    margin: 0;
    padding: 0;
  }

  &__list {
    position: absolute;
    bottom: 8rem;
    top: 8rem;
    left: 0;
    right: 0;
    list-style: none;
  }

  &__button {
    position: absolute;
    bottom: 4rem;
    left: 4rem;
    right: 4rem;
    display: block;
    padding: 1rem 0;
    background: #ddd;
    text-decoration: none;
    text-align: center;
    color: inherit;
    border-radius: 0.25rem;
    transition: background-color 150ms ease-out;

    &:hover {
      background: #ccc;
    }
  }
}
</style>
