import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex';
import Cookie from 'js-cookie';

export const state = () => ({
  products: [] as ShopifyBuy.Product[],
  checkout: undefined as ShopifyBuy.Cart | undefined,
});
export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  products: (state) => state.products,
  checkout: (state) => state.checkout,
  cart: (state) => (state.checkout ? state.checkout.lineItems : []),
  checkoutUrl: (state) => (state.checkout ? (state.checkout as any).webUrl : undefined),
};

export const mutations: MutationTree<RootState> = {
  SET_PRODUCTS: (state, newProducts: ShopifyBuy.Product[]) => (state.products = newProducts),
  SET_CHECKOUT: (state, newCheckout: ShopifyBuy.Cart) => {
    state.checkout = newCheckout;
    Cookie.set('checkout', newCheckout.id.toString());
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { $shopify }) {
    // Fetch products
    const products = await ($shopify as ShopifyBuy.Client).product.fetchAll();
    commit('SET_PRODUCTS', products);
  },
  async nuxtClientInit({ commit }, { $shopify }) {
    // Fetch existing checkout
    const checkoutId = Cookie.get('checkout');
    if (checkoutId) {
      const checkout = await ($shopify as ShopifyBuy.Client).checkout.fetch(checkoutId);
      commit('SET_CHECKOUT', checkout);
    }
  },
  async ensureCheckout({ getters, commit }) {
    if (getters.checkout === undefined) {
      const checkout = await this.$shopify.checkout.create();
      commit('SET_CHECKOUT', checkout);
    }
  },
  async addToCart({ dispatch, getters, commit }, item: ShopifyBuy.LineItemToAdd) {
    await dispatch('ensureCheckout');
    const checkout = await this.$shopify.checkout.addLineItems((getters.checkout as ShopifyBuy.Cart).id, [item]);
    commit('SET_CHECKOUT', checkout);
  },
};
