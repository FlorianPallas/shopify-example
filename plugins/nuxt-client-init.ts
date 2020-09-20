import { Plugin } from '@nuxt/types';

const nuxtPlugin: Plugin = async (ctx) => {
  await ctx.store.dispatch('nuxtClientInit', ctx);
};
export default nuxtPlugin;
