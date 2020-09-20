import { NuxtConfig } from '@nuxt/types';
import fetch from 'node-fetch';
import shopify from 'shopify-buy';

const config: NuxtConfig = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'shopify-example',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['normalize.css', '~/assets/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/nuxt-client-init.ts', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['~/assets/vars.scss', '~/assets/mixins.scss'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['nuxt-shopify'],

  // Shopify Configuration (https://github.com/Gomah/nuxt-shopify#readme)
  shopify: {
    domain: process.env.SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_TOKEN,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: process.env.NODE_ENV !== 'production' ? '/_nuxt/' : '/assets/',
  },

  // Generate Configuration (https://nuxtjs.org/guides/configuration-glossary/configuration-generate)
  generate: {
    fallback: true,
    routes: async () => {
      if (process.env.SHOPIFY_DOMAIN === undefined || process.env.SHOPIFY_TOKEN === undefined) {
        return [];
      }

      const client = shopify.buildClient(
        {
          domain: process.env.SHOPIFY_DOMAIN,
          storefrontAccessToken: process.env.SHOPIFY_TOKEN,
        },
        // @ts-ignore
        fetch
      );

      const products = await client.product.fetchAll();
      console.log(products);

      return products.map((p) => `/products/${(p as any).handle}`);
    },
  },
};
export default config;
